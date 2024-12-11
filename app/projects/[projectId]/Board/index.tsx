'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { statuses, tasks as items, projects } from '@/mock-data';
import { cn } from '@/lib/utils';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { ColumnContainer } from './ColumnContainer';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { v4 as uid } from 'uuid';
import { useParams } from 'next/navigation';
import { TaskItem } from './TaskItem';

interface Props {
  projectId: string;
  projectName: string;
  statuses: IStatus[];
}

export const Board: React.FC<Props> = ({
  projectId,
  projectName,
  statuses,
}) => {
  const [columns, setColumns] = useState(statuses);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const touchSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    setColumns?.((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (item) => item.id === active.id
      );
      const overColumnIndex = prevColumns.findIndex(
        (item) => item.id === over?.id
      );

      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveItemATask = active.data.current?.type === 'task';
    const isOverItemATask = over.data.current?.type === 'task';

    if (!isActiveItemATask) return;

    if (isActiveItemATask && isOverItemATask) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        const overIndex = prevTasks.findIndex((item) => item.id === overId);

        prevTasks[activeIndex].status_id = prevTasks[overIndex].status_id;

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'column';

    if (isActiveItemATask && isOverAColumn) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        prevTasks[activeIndex].status_id = overId as string;

        return arrayMove(prevTasks, activeIndex, activeIndex);
      });
    }
  };

  const getColumnTasks = (statusId: string) => {
    return tasks.filter((task) => task.status_id === statusId);
  };

  return (
    <div className="relative flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        collisionDetection={closestCenter}
        sensors={sensors}
      >
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex space-x-4">
            {columns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                tasks={getColumnTasks(column.id)}
                projectName={projectName}
              />
            ))}
          </div>
        </SortableContext>

        {typeof window === 'object' &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  tasks={getColumnTasks(activeColumn.id)}
                  projectName={projectName}
                />
              )}

              {activeTask && (
                <TaskItem item={activeTask} projectName={projectName} />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>

      <CreateCustomFieldOptionModal
        title="New Column"
        handleSubmit={(data) =>
          setColumns((prevColumns) => [
            ...prevColumns,
            {
              ...data,
              id: uid(),
              order: prevColumns.length - 1,
              limit: 5,
              project_id: 'project-1',
            } as IStatus,
          ])
        }
        triggerBtn={
          <Button className={cn(secondaryBtnStyles, 'w-8 h-8 p-2 ')}>
            <Plus />
          </Button>
        }
      ></CreateCustomFieldOptionModal>
    </div>
  );
};
