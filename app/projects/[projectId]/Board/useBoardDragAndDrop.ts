import { tasks as tasksUtils } from '@/utils/tasks';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { getColumnSortedTasks } from '@/utils/sort';

type SetTasksFunction = React.Dispatch<
  React.SetStateAction<ITaskWithOptions[]>
>;

export const useBoardDragAndDrop = (projectId: string) => {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<ITaskWithOptions | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const touchSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor);

  // Helper function to calculate new position between two values
  const calculateNewPosition = (before: number, after: number): number => {
    return Math.floor((before + after) / 2);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const handleDragEnd = async (
    event: DragEndEvent,
    tasks: ITaskWithOptions[],
    setTasks: SetTasksFunction
  ) => {
    const { active, over } = event;

    if (!over) return;
    if (!activeColumnId || !overColumnId) return;

    try {
      setIsUpdating(true);
      const overTask =
        over.data.current?.type === 'task'
          ? tasks.find((task) => task.id === over.id)
          : null;

      const targetColumnTasks = getColumnSortedTasks(
        tasks,
        overColumnId
      ).filter((task) => !task.priority);

      let newPosition: number;

      if (activeColumnId === overColumnId) {
        // Reordering within same column
        if (overTask) {
          const overIndex = targetColumnTasks.findIndex(
            (t) => t.id === over.id
          );
          newPosition = calculateNewPosition(
            overIndex > 0
              ? (targetColumnTasks[overIndex - 1]?.statusPosition ?? 1000)
              : 1000,
            overIndex < targetColumnTasks.length - 1
              ? (targetColumnTasks[overIndex + 1]?.statusPosition ?? 0)
              : 0
          );
        } else {
          newPosition =
            targetColumnTasks.length > 0
              ? (targetColumnTasks[targetColumnTasks.length - 1]
                  ?.statusPosition ?? 0) - 100
              : 500;
        }

        await tasksUtils.board.updatePosition(active.id as string, newPosition);
      } else {
        // Moving to different column
        if (overTask) {
          const overIndex = targetColumnTasks.findIndex(
            (t) => t.id === over.id
          );
          newPosition = calculateNewPosition(
            overIndex > 0
              ? (targetColumnTasks[overIndex - 1]?.statusPosition ?? 1000)
              : 1000,
            overIndex < targetColumnTasks.length - 1
              ? (targetColumnTasks[overIndex + 1]?.statusPosition ?? 0)
              : 0
          );
        } else {
          newPosition =
            targetColumnTasks.length > 0
              ? (targetColumnTasks[targetColumnTasks.length - 1]
                  ?.statusPosition ?? 0) - 100
              : 500;
        }

        await tasksUtils.board.moveTask(
          active.id as string,
          overColumnId,
          newPosition
        );
      }

      const updatedTasks = await tasksUtils.board.getProjectTasks(projectId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task position:', error);
    } finally {
      setIsUpdating(false);
      setActiveTask(null);
      setActiveColumnId(null);
      setOverColumnId(null);
    }
  };

  const handleDragOver = (
    event: DragOverEvent,
    tasks: ITaskWithOptions[],
    setTasks: SetTasksFunction
  ) => {
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
      setTasks(
        arrayMove(
          [...tasks],
          tasks.findIndex((item) => item.id === activeId),
          tasks.findIndex((item) => item.id === overId)
        )
      );
    }

    if (isOverATaskInDifferentColumn) {
      setOverColumnId(over.data.current?.task.status_id);
      setActiveColumnId(active.data.current?.task.status_id);

      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        const overIndex = prevTasks.findIndex((item) => item.id === overId);
        const newTasks = [...prevTasks];

        const updatedTask = {
          ...newTasks[activeIndex],
          status_id: over.data.current?.task.status_id,
        };

        newTasks.splice(activeIndex, 1);
        newTasks.splice(overIndex, 0, updatedTask);

        return newTasks;
      });
    }

    if (isOverAColumn) {
      setOverColumnId(overId as string);
      setActiveColumnId(active.data.current?.task.status_id);

      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((item) => item.id === activeId);
        const newTasks = [...prevTasks];

        const updatedTask = {
          ...newTasks[activeIndex],
          status_id: overId as string,
        };

        newTasks.splice(activeIndex, 1);
        newTasks.push(updatedTask);

        return newTasks;
      });
    }
  };

  return {
    activeTask,
    isUpdating,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
