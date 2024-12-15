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
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
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

  const onDragEnd = async (event: DragEndEvent) => {
    console.log('======================================');
    console.log('activeColumnId', activeColumnId);
    console.log('overColumnId', overColumnId);

    const { active, over } = event;

    if (!over) return;

    // const isActiveItemATask = active.data.current?.type === 'task';

    // if (isActiveItemATask) {
    //   const task = tasks.find((task) => task.id === active.id);

    //   console.log('task', task);

    //   console.log('active', task?.status_id);
    //   console.log('__over', over.data.current?.task.status_id);
    // }

    // setActiveTask(null);

    // if (active.id === over.id) return;

    // await tasksUtils.moveTask(active.id as string, over.id as string);

    // setColumns?.((prevColumns) => {
    //   const activeColumnIndex = prevColumns.findIndex(
    //     (item) => item.id === active.id
    //   );
    //   const overColumnIndex = prevColumns.findIndex(
    //     (item) => item.id === over?.id
    //   );

    //   return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    // });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveItemATask = active.data.current?.type === 'task';

    if (!isActiveItemATask) return;

    const isOverATaskInSameColumn =
      over.data.current?.type === 'task' &&
      over.data.current?.task.status_id === active.data.current?.task.status_id;

    const isOverATaskInDifferentColumn =
      over.data.current?.type === 'task' &&
      over.data.current?.task.status_id !== active.data.current?.task.status_id;

    const isOverAColumn = over.data.current?.type === 'column';

    if (isOverATaskInSameColumn) {
      setOverColumnId(active.data.current?.task.status_id);
      setActiveColumnId(active.data.current?.task.status_id);
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        const overIndex = prevTasks.findIndex((item) => item.id === overId);

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    if (isOverATaskInDifferentColumn) {
      setOverColumnId(over.data.current?.task.status_id);
      setActiveColumnId(active.data.current?.task.status_id);

      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        const overIndex = prevTasks.findIndex((item) => item.id === overId);

        // update the status_id(column id) of the active task to the over column id
        prevTasks[activeIndex].status_id = prevTasks[overIndex].status_id;

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    if (isOverAColumn) {
      setOverColumnId(overId as string);
      setActiveColumnId(active.data.current?.task.status_id);
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);

        // update the status_id(column id) of the active task to the over column id
        prevTasks[activeIndex].status_id = overId as string;

        return arrayMove(prevTasks, activeIndex, activeIndex);
      });
    }
  };

  const getColumnTasks = (statusId: string) => {
    const filteredTasks = tasks.filter((task) => task.status_id === statusId);

    return filteredTasks.sort((a, b) => {
      // If both tasks have priorities, sort by order
      if (a.priority?.order !== undefined && b.priority?.order !== undefined) {
        return b.priority.order - a.priority.order; // Higher order first
      }

      // If only task A has priority, it should come first
      if (a.priority?.order !== undefined) {
        return -1;
      }

      // If only task B has priority, it should come first
      if (b.priority?.order !== undefined) {
        return 1;
      }

      // If neither has priority, maintain original order
      return 0;
    });
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
