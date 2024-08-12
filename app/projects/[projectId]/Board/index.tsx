'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { statuses } from '@/mock-data';
import { cn } from '@/lib/utils';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { ColumnContainer } from './ColumnContainer';
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
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { v4 as uid } from 'uuid';

export const Board: React.FC = () => {
  const [columns, setColumns] = useState(statuses);
  const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);
  const touchSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current?.column);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setColumns?.((prevOptions) => {
        const oldIndex = prevOptions.findIndex((item) => item.id === active.id);
        const newIndex = prevOptions.findIndex((item) => item.id === over?.id);

        return arrayMove(prevOptions, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="relative flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        collisionDetection={closestCenter}
        sensors={sensors}
      >
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex space-x-4">
            {columns.map((column) => (
              <ColumnContainer key={column.id} column={column} />
            ))}
          </div>
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
          </DragOverlay>,
          document?.body
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
