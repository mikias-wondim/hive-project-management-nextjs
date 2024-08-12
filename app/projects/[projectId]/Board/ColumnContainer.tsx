'use client';
import { successBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { projects, tasks } from '@/mock-data';
import { Plus } from 'lucide-react';
import { ColumnLabelColor } from './ColumnLabelColor';
import { ColumnMenuOptions } from './ColumnMenuOptions';
import { TaskItem } from './TaskItem';
import { useModalDialog } from '@/hooks/useModalDialog';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  column: IStatus;
}

export const ColumnContainer = ({ column }: Props) => {
  const [items, setItems] = useState<ITask[]>(
    tasks.filter((task) => task.status_id === column.id)
  );
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const { openModal, closeModal, isModalOpen } = useModalDialog();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const touchSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current?.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over?.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const projectName = projects.filter(
    (project) => project.id === column.project_id
  )[0].name;

  const handleAddItem = () => {
    closeModal();
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] opacity-50 flex-shrink-0 bg-gray-100 dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800"
      ></div>
    );
  }

  return (
    <div
      className="w-[350px] flex-shrink-0 bg-gray-100 dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800"
      ref={setNodeRef}
      style={style}
    >
      <div {...listeners} {...attributes} className="p-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ColumnLabelColor color={column.color} />
            <h1 className="text-sm font-bold">{column.label}</h1>
            <div className="px-2 h-4 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 rounded-full flex justify-center items-center text-[10px]">
              {items.length} / {column.limit}
            </div>
          </div>
          <ColumnMenuOptions column={column} />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {column.description}
        </div>
      </div>

      <div className=" flex flex-col h-minus-230 ">
        <DndContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          collisionDetection={closestCenter}
          sensors={sensors}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="flex-grow overflow-y-auto space-y-2 py-2">
              {items.map((item) => (
                <TaskItem key={item.id} item={item} projectName={projectName} />
              ))}
            </div>
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {activeTask && (
                <TaskItem item={activeTask} projectName={projectName} />
              )}
            </DragOverlay>,
            document?.body
          )}
        </DndContext>

        <Sheet
          open={isModalOpen}
          onOpenChange={(open) => !open && closeModal()}
        >
          <SheetTrigger asChild>
            <Button
              onClick={openModal}
              className="h-[45px] w-full rounded-none mb-[-1px] rounded-b-sm bg-transparent text-gray-500 hover:bg-gray-200 hover:dark:bg-gray-900 dark:text-gray-400 flex justify-start hover:border-t"
            >
              <Plus className="w-4 h-4 mr-2" /> Add item
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="mx-4 border rounded-sm py-3">
            <SheetHeader>
              <SheetTitle className="text-xs mb-2 text-left font-normal">
                Add new item to &apos;{column.label}&apos; column
              </SheetTitle>
            </SheetHeader>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Start typing to add item"
                className="h-8 focus:ring-0 dark:focus:ring-0"
              />
              <Button
                onClick={handleAddItem}
                className={cn(successBtnStyles, 'h-8')}
              >
                Add
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
