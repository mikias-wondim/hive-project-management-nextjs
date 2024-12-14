'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { Button } from '@/components/ui/button';
import { useProjectAccess } from '@/hooks/useProjectAccess';
import { cn } from '@/lib/utils';
import { tasks as tasksUtils } from '@/utils/tasks';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ColumnContainer } from './ColumnContainer';
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
  const { can } = useProjectAccess({ projectId });
  const [columns, setColumns] = useState(statuses);
  const [tasks, setTasks] = useState<ITaskWithOptions[]>([]);
  const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);
  const [activeTask, setActiveTask] = useState<ITaskWithOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const touchSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor);

  const onDragStart = (event: DragStartEvent) => {
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

    console.log('active', active);
    console.log('over', over);

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

  const handleTaskCreated = (newTask: ITaskWithOptions) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // loading of tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const projectTasks =
          await tasksUtils.getProjectTasksWithOptions(projectId);
        setTasks(projectTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [projectId]);

  return (
    <div className="relative flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        {columns.map((column) => (
          <ColumnContainer
            projectId={projectId}
            key={column.id}
            column={column}
            can={can}
            tasks={getColumnTasks(column.id)}
            projectName={projectName}
            onTaskCreated={handleTaskCreated}
          />
        ))}

        <DragOverlay>
          {activeTask && (
            <TaskItem item={activeTask} projectName={projectName} />
          )}
        </DragOverlay>
      </DndContext>

      <CreateCustomFieldOptionModal
        title="New Column"
        handleSubmit={(data) =>
          setColumns((prevColumns) => [
            ...prevColumns,
            {
              ...data,
              id: crypto.randomUUID(),
              order: prevColumns.length - 1,
              limit: 5,
              project_id: projectId,
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
