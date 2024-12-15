export const sortTasks = (tasks: ITaskWithOptions[]) => {
  return tasks.sort((a, b) => {
    // First sort by priority
    if (a.priority?.order !== undefined && b.priority?.order !== undefined) {
      return b.priority.order - a.priority.order;
    }
    if (a.priority?.order !== undefined) return -1;
    if (b.priority?.order !== undefined) return 1;

    // Then sort by status_position
    return (b.statusPosition ?? 0) - (a.statusPosition ?? 0);
  });
};

export const getColumnSortedTasks = (
  tasks: ITaskWithOptions[],
  statusId: string
) => {
  const filteredTasks = tasks.filter((task) => task.status_id === statusId);
  return sortTasks(filteredTasks);
};

export const findFirstNonPriorityPosition = (tasks: ITaskWithOptions[]) => {
  const sortedTasks = sortTasks(tasks);
  const firstNonPriorityTask = sortedTasks.find((task) => !task.priority);
  return firstNonPriorityTask?.statusPosition ?? 1000;
};

export const findLowestPosition = (tasks: ITaskWithOptions[]) => {
  const sortedTasks = sortTasks(tasks);
  const lowestPosition =
    sortedTasks[sortedTasks.length - 1]?.statusPosition ?? 0;
  return lowestPosition;
};
