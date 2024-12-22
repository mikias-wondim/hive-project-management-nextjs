import { useProjectQueries } from '@/hooks/useProjectQueries';
import { canMoveTask, moveTaskDown, moveTaskUp } from '@/utils/move-task';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { tasks as tasksUtils } from '@/utils/tasks';
import { toast } from '@/components/ui/use-toast';

type SetTasksFunction = React.Dispatch<
  React.SetStateAction<ITaskWithOptions[]>
>;

export const useBoardDragAndDrop = (projectId: string) => {
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<ITaskWithOptions | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { reloadProjectTasks } = useProjectQueries(projectId);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

  // Helper function to calculate new position between two values
  const calculateNewPosition = (before: number, after: number): number => {
    return Math.floor((before + after) / 2);
  };

  // Set the active task when dragging starts
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

    if (
      !over ||
      active.data.current?.type !== 'task' ||
      active.id === over.id
    ) {
      setOverColumnId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const overPosition = event.over?.data?.current?.position;
    const activePosition = event.active?.data?.current?.position;

    const isOverATaskInSameColumn =
      over.data.current?.type === 'task' &&
      over.data.current?.task.status_id === active.data.current?.task.status_id;

    if (isOverATaskInSameColumn) {
      // we need to check if there are priority constraints
      const overTask: ITaskWithOptions = over.data.current?.task;
      const activeTask: ITaskWithOptions = active.data.current?.task;
      const cannotMove = !canMoveTask(overTask, activeTask);
      if (cannotMove) {
        setOverColumnId(null);
        return;
      }

      let newStatusPosition;
      // if active position is greater than over position, we are moving task up
      if (activePosition > overPosition) {
        newStatusPosition = moveTaskUp(
          overPosition,
          overId as string,
          overColumnId ?? '',
          tasks
        );
      }

      // if active position is less than over position, we are moving task down
      if (activePosition < overPosition) {
        newStatusPosition = moveTaskDown(
          overPosition,
          overId as string,
          overColumnId ?? '',
          tasks
        );
      }

      const activeIndex = tasks.findIndex((item) => item.id === activeId);
      tasks[activeIndex].statusPosition = newStatusPosition;
      setTasks([...tasks]);
      setOverColumnId(null);

      try {
        await tasksUtils.board.updatePosition(
          activeId as string,
          newStatusPosition as number
        );
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to move task. Please try again.',
        });
      }

      return;
    }

    const isOverATaskInDifferentColumn =
      over.data.current?.type === 'task' &&
      over.data.current?.task.status_id !== active.data.current?.task.status_id;

    if (isOverATaskInDifferentColumn) {
      let newStatusPosition;

      if (
        !active.data.current?.task.priority &&
        over.data.current?.task.priority
      ) {
        // insert below
        const columnTasks = tasks.filter(
          (task) => task.status_id === overColumnId
        );

        const firstNonPriorityTask = columnTasks.find((task) => !task.priority);
        //  find index of firstNonPriorityTask as the position of the task in the column
        const firstNonPriorityTaskIndex = columnTasks.findIndex(
          (task) => task.id === firstNonPriorityTask?.id
        );

        if (firstNonPriorityTask) {
          newStatusPosition = moveTaskUp(
            firstNonPriorityTaskIndex,
            firstNonPriorityTask?.id ?? '',
            overColumnId ?? '',
            tasks
          );
        } else {
          const lastTaskIndex = columnTasks.length - 1;
          const lastTaskId = columnTasks[lastTaskIndex].id;
          newStatusPosition = moveTaskDown(
            lastTaskIndex,
            lastTaskId ?? '',
            overColumnId ?? '',
            tasks
          );
        }
      } else if (
        active.data.current?.task.priority &&
        !over.data.current?.task.priority
      ) {
        const columnTasks = tasks.filter(
          (task) => task.status_id === overColumnId
        );
        // find last priority task in the column
        const priorityTasks = columnTasks.filter((task) => task.priority);
        const lastPriorityTask = priorityTasks[priorityTasks.length - 1];
        const astPriorityTaskIndex = columnTasks.findIndex(
          (task) => task.id === lastPriorityTask?.id
        );

        if (lastPriorityTask) {
          newStatusPosition = moveTaskDown(
            astPriorityTaskIndex,
            lastPriorityTask.id ?? '',
            overColumnId ?? '',
            tasks
          );
        } else {
          // place it as the first task in the column
          newStatusPosition = moveTaskDown(
            0,
            columnTasks[0].id ?? '',
            overColumnId ?? '',
            tasks
          );
        }
      } else if (
        (active.data.current?.task.priority?.order as number) >
        (over.data.current?.task.priority?.order as number)
      ) {
        const columnTasks = tasks.filter(
          (task) => task.status_id === overColumnId
        );
        //  find all tasks in the column whose priority order is one less than the active task's priority order
        const tasksWithLowerPriority = columnTasks.filter(
          (task) =>
            task.priority?.order ===
            active.data.current?.task.priority?.order - 1
        );
        // get the first task in the above filtered tasks
        const firstTaskWithLowerPriority = tasksWithLowerPriority[0];

        // use the task id to get the index from the column tasks.
        const firstTaskWithLowerPriorityIndex = columnTasks.findIndex(
          (task) => task.id === firstTaskWithLowerPriority?.id
        );

        // calculate new position with the index and the task id by moving the task up
        newStatusPosition = moveTaskUp(
          firstTaskWithLowerPriorityIndex,
          firstTaskWithLowerPriority?.id ?? '',
          overColumnId ?? '',
          tasks
        );
      } else {
        const activeRect = active.rect.current.translated;
        const overRect = over.rect;

        // Calculate the midpoints of the active and over elements
        const activeMidY =
          (activeRect?.top ?? 0) + (activeRect?.height ?? 0) / 2;
        const overMidY = (overRect?.top ?? 0) + (overRect?.height ?? 0) / 2;

        if (activeMidY < overMidY) {
          //Insert above
          console.log('Insert above', over.data.current?.task.title);
          console.log('overPosition', overPosition);
          console.log('overId', overId);
          newStatusPosition = moveTaskUp(
            overPosition,
            overId as string,
            overColumnId ?? '',
            tasks
          );
          console.log('newStatusPosition', newStatusPosition);
        } else {
          // insert below
          console.log('Insert below');
          newStatusPosition = moveTaskDown(
            overPosition,
            overId as string,
            overColumnId ?? '',
            tasks
          );
        }
      }

      const activeIndex = tasks.findIndex((item) => item.id === activeId);
      tasks[activeIndex].statusPosition = newStatusPosition;
      tasks[activeIndex].status_id = overColumnId as string;
      setTasks([...tasks]);
      setOverColumnId(null);

      try {
        await tasksUtils.board.moveTask(
          activeId as string,
          overColumnId as string,
          newStatusPosition as number
        );
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to move task. Please try again.',
        });
      }

      return;
    }

    const isOverAColumn =
      active.data.current?.type === 'task' &&
      over.data.current?.type === 'column';

    if (isOverAColumn) {
      const columnTasks = tasks.filter(
        (task) => task.status_id === overColumnId
      );

      //  case 1: no tasks in column
      if (columnTasks.length === 0) {
        const activeIndex = tasks.findIndex((item) => item.id === activeId);
        tasks[activeIndex].statusPosition = 10000;
        tasks[activeIndex].status_id = overColumnId as string;
        setTasks([...tasks]);
        setOverColumnId(null);

        try {
          await tasksUtils.board.moveTask(
            activeId as string,
            overColumnId ?? '',
            10000
          );
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to move task. Please try again.',
          });
        }

        return;
      }

      //  case 2: tasks in column, but active task has no priority. place it at the bottom of the column
      else if (columnTasks.length > 0 && !active.data.current?.task.priority) {
        const lastTaskIndex = columnTasks.length - 1;
        const lastTaskId = columnTasks[lastTaskIndex].id;
        const newStatusPosition = moveTaskDown(
          lastTaskIndex,
          lastTaskId ?? '',
          overColumnId ?? '',
          tasks
        );

        const activeIndex = tasks.findIndex((item) => item.id === activeId);
        tasks[activeIndex].statusPosition = newStatusPosition;
        tasks[activeIndex].status_id = overColumnId as string;
        setTasks([...tasks]);
        setOverColumnId(null);

        try {
          await tasksUtils.board.moveTask(
            activeId as string,
            overColumnId as string,
            newStatusPosition ?? 0
          );
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to move task. Please try again.',
          });
        }
        setOverColumnId(null);
        return;
      }
      //  case 3: tasks in column but active task has priority
      else if (columnTasks.length > 0 && active.data.current?.task.priority) {
        //  find all tasks in the column whose priority order is one less than the active task's priority order
        let newStatusPosition;

        const tasksWithLowerPriority = columnTasks.filter(
          (task) =>
            task.priority?.order ===
            active.data.current?.task.priority?.order - 1
        );

        const tasksWithSamePriority = columnTasks.filter(
          (task) =>
            task.priority?.order === active.data.current?.task.priority?.order
        );

        if (tasksWithLowerPriority.length > 0) {
          // get the first task in the above filtered tasks
          const targetTaskWithLowerPriority = tasksWithLowerPriority[0];
          const index = columnTasks.findIndex(
            (task) => task.id === targetTaskWithLowerPriority?.id
          );
          newStatusPosition = moveTaskUp(
            index,
            targetTaskWithLowerPriority?.id ?? '',
            overColumnId ?? '',
            tasks
          );
        } else if (tasksWithSamePriority.length > 0) {
          // get the last task in the above filtered tasks
          const columnTaskWithSamePriority =
            tasksWithSamePriority[tasksWithSamePriority.length - 1];

          const index = columnTasks.findIndex(
            (task) => task.id === columnTaskWithSamePriority?.id
          );

          newStatusPosition = moveTaskUp(
            index,
            columnTaskWithSamePriority?.id ?? '',
            overColumnId ?? '',
            tasks
          );
        } else {
          const targetTaskWithLowerPriority =
            columnTasks[columnTasks.length - 1];
          const index = columnTasks.findIndex(
            (task) => task.id === targetTaskWithLowerPriority?.id
          );

          newStatusPosition = moveTaskDown(
            index,
            targetTaskWithLowerPriority?.id ?? '',
            overColumnId ?? '',
            tasks
          );
        }

        const activeIndex = tasks.findIndex((item) => item.id === activeId);
        tasks[activeIndex].statusPosition = newStatusPosition;
        tasks[activeIndex].status_id = overColumnId as string;
        setTasks([...tasks]);
        setOverColumnId(null);

        try {
          await tasksUtils.board.moveTask(
            activeId as string,
            overColumnId as string,
            newStatusPosition ?? 0
          );
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to move task. Please try again.',
          });
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
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

    const isOverAColumn =
      active.data.current?.type === 'task' &&
      over.data.current?.type === 'column';

    if (isOverATaskInSameColumn) {
      setOverColumnId(active.data.current?.task.status_id);
    }

    if (isOverATaskInDifferentColumn) {
      setOverColumnId(over.data.current?.task.status_id);
    }

    if (isOverAColumn) {
      setOverColumnId(overId as string);
    }
  };

  return {
    overColumnId,
    activeTask,
    isUpdating,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
