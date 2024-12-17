import { createContext, useContext, useState } from 'react';

interface TaskDetailsContextType {
  selectedTask: ITaskWithOptions | null;
  projectName: string;
  isDrawerOpen: boolean;
  openDrawer: (task: ITaskWithOptions, projectName: string) => void;
  closeDrawer: () => void;
  updateTaskTitle?: (taskId: string, newTitle: string) => void;
  updateTaskDescription?: (taskId: string, description: string) => void;
  updateTaskLabels?: (
    taskId: string,
    labels: { id: string; label: string; color: string }[]
  ) => void;
  updateTaskSize?: (
    taskId: string,
    size: { id: string; label: string; color: string } | null
  ) => void;
  updateTaskPriority?: (
    taskId: string,
    priority: { id: string; label: string; color: string; order: number } | null
  ) => void;
}

const TaskDetailsContext = createContext<TaskDetailsContextType | undefined>(
  undefined
);

export function TaskDetailsProvider({
  children,
  onTaskUpdate,
}: {
  children: React.ReactNode;
  onTaskUpdate?: (taskId: string, updates: Partial<ITask>) => void;
}) {
  const [selectedTask, setSelectedTask] = useState<ITaskWithOptions | null>(
    null
  );
  const [projectName, setProjectName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = (task: ITaskWithOptions, projectName: string) => {
    setSelectedTask(task);
    setProjectName(projectName);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, title: newTitle } : prev
    );
    onTaskUpdate?.(taskId, { title: newTitle });
  };

  const updateTaskDescription = (taskId: string, description: string) => {
    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, description } : prev
    );
    onTaskUpdate?.(taskId, { description });
  };

  const updateTaskLabels = (
    taskId: string,
    labels: { id: string; label: string; color: string }[]
  ) => {
    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, labels } : prev
    );
    onTaskUpdate?.(taskId, { labels: labels.map((l) => l.id) });
  };

  const updateTaskSize = (
    taskId: string,
    size: { id: string; label: string; color: string } | null
  ) => {
    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, size: size || undefined } : prev
    );
    onTaskUpdate?.(taskId, { size: size?.id || null });
  };

  const updateTaskPriority = (
    taskId: string,
    priority: { id: string; label: string; color: string; order: number } | null
  ) => {
    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, priority: priority || undefined } : prev
    );
    onTaskUpdate?.(taskId, { priority: priority?.id || null });
  };

  return (
    <TaskDetailsContext.Provider
      value={{
        selectedTask,
        projectName,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        updateTaskTitle,
        updateTaskDescription,
        updateTaskLabels,
        updateTaskSize,
        updateTaskPriority,
      }}
    >
      {children}
    </TaskDetailsContext.Provider>
  );
}

export const useTaskDetails = () => {
  const context = useContext(TaskDetailsContext);
  if (context === undefined) {
    throw new Error('useTaskDetails must be used within a TaskDetailsProvider');
  }
  return context;
};
