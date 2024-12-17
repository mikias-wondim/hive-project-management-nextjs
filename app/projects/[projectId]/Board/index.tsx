'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { Button } from '@/components/ui/button';
import { useProjectAccess } from '@/hooks/useProjectAccess';
import { cn } from '@/lib/utils';
import { tasks as tasksUtils } from '@/utils/tasks';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { Plus, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ColumnContainer } from './ColumnContainer';
import { TaskItem } from './TaskItem';
import { getColumnSortedTasks } from '@/utils/sort';
import { useBoardDragAndDrop } from './useBoardDragAndDrop';
import { columns as columnsUtils } from '@/utils/columns';
import { toast } from '@/components/ui/use-toast';
import { TaskDetailsProvider } from './TaskDetailsContext';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';

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
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [tasks, setTasks] = useState<ITaskWithOptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    activeTask,
    isUpdating,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useBoardDragAndDrop(projectId);

  const getColumnTasks = (statusId: string) => {
    return getColumnSortedTasks(tasks, statusId);
  };

  const handleTaskCreated = (newTask: ITaskWithOptions) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleColumnUpdate = (updatedColumn: IStatus) => {
    setColumns((prev) =>
      prev.map((status) =>
        status.id === updatedColumn.id ? updatedColumn : status
      )
    );
  };

  const handleColumnDelete = (columnId: string) => {
    setColumns((prev) => prev.filter((status) => status.id !== columnId));
  };

  const handleColumnHide = (columnId: string) => {
    setHiddenColumns((prev) => new Set([...prev, columnId]));
  };

  const handleShowHiddenColumns = () => {
    setHiddenColumns(new Set());
  };

  const visibleColumns = columns.filter(
    (column) => !hiddenColumns.has(column.id)
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const projectTasks = await tasksUtils.board.getProjectTasks(projectId);
        setTasks(projectTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [projectId]);

  const handleCreateColumn = async (data: Omit<ICustomFieldData, 'id'>) => {
    try {
      setIsLoading(true);
      const newColumn = await columnsUtils.createColumn(projectId, data);
      setColumns((prev) => [...prev, newColumn]);
      toast({
        title: 'Success',
        description: 'Column created successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error creating column:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create column',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<ITask>) => {
    try {
      await tasksUtils.details.update(taskId, updates);

      if ('labels' in updates || 'size' in updates || 'priority' in updates) {
        const updatedTasks = await tasksUtils.board.getProjectTasks(projectId);
        setTasks(updatedTasks);
      } else {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? { ...task, ...(updates as Partial<ITaskWithOptions>) }
              : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update task',
      });
    }
  };

  return (
    <TaskDetailsProvider onTaskUpdate={handleTaskUpdate}>
      <div className="relative flex flex-col h-minus-135 overflow-y-hidden p-4">
        {hiddenColumns.size > 0 && (
          <div className="px-4 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs gap-1.5"
              onClick={handleShowHiddenColumns}
            >
              <Eye className="w-3 h-3" />
              Show hidden columns ({hiddenColumns.size})
            </Button>
          </div>
        )}

        <div className="flex-1 flex items-start gap-2">
          <div className="flex flex-1 space-x-4 h-full">
            {isUpdating && (
              <div className="absolute inset-0 bg-black/50 z-50" />
            )}
            <DndContext
              onDragEnd={(e) => handleDragEnd(e, tasks, setTasks)}
              onDragStart={handleDragStart}
              onDragOver={(e) => handleDragOver(e, tasks, setTasks)}
              collisionDetection={closestCorners}
              sensors={sensors}
            >
              {visibleColumns.map((column) => (
                <ColumnContainer
                  projectId={projectId}
                  key={column.id}
                  column={column}
                  can={can}
                  tasks={getColumnTasks(column.id)}
                  projectName={projectName}
                  onTaskCreated={handleTaskCreated}
                  onColumnUpdate={handleColumnUpdate}
                  onColumnDelete={handleColumnDelete}
                  onColumnHide={handleColumnHide}
                />
              ))}

              <DragOverlay>
                {activeTask && (
                  <TaskItem item={activeTask} projectName={projectName} />
                )}
              </DragOverlay>
            </DndContext>
          </div>

          <CreateCustomFieldOptionModal
            title="New Column"
            can={can}
            handleSubmit={handleCreateColumn}
            triggerBtn={
              <Button
                className={cn(secondaryBtnStyles, 'w-8 h-8 p-2 mr-4')}
                disabled={isLoading}
              >
                <Plus />
              </Button>
            }
          />
        </div>
        <TaskDetailsDrawer />
      </div>
    </TaskDetailsProvider>
  );
};
