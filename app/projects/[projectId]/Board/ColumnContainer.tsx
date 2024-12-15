'use client';
import { successBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ProjectAction } from '@/consts';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { tasks as taskUtils } from '@/utils/tasks';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { User } from '@supabase/supabase-js';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ColumnLabelColor } from './ColumnLabelColor';
import { ColumnMenuOptions } from './ColumnMenuOptions';
import { TaskItem } from './TaskItem';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  projectId: string;
  column: IStatus;
  tasks: ITaskWithOptions[];
  projectName: string;
  can?: (action: ProjectAction) => boolean;
  onTaskCreated?: (task: ITaskWithOptions) => void;
}

const supabase = createClient();

export const ColumnContainer = ({
  projectId,
  column,
  tasks: columnTasks,
  projectName,
  can,
  onTaskCreated,
}: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleAddItem = async () => {
    if (!inputValue.trim() || isCreating || !user) return;

    try {
      setIsCreating(true);

      const task = await taskUtils.createTask({
        project_id: projectId,
        status_id: column.id,
        title: inputValue.trim(),
        description: '',
        created_by: user.id,
      });

      toast({
        title: 'Success',
        description: 'Task created successfully',
      });

      onTaskCreated?.(task);
      setInputValue('');
      setShowInput(false);
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create task',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    } else if (e.key === 'Escape') {
      setShowInput(false);
      setInputValue('');
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="w-[350px] flex-shrink-0 bg-gray-100 dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800 flex flex-col"
    >
      <div className="p-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ColumnLabelColor color={column.color} />
            <h1 className="text-sm font-bold">{column.label}</h1>
            <div className="px-2 h-4 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 rounded-full flex justify-center items-center text-[10px]">
              {columnTasks.length} / {column.limit}
            </div>
          </div>
          {can?.(ProjectAction.VIEW_SETTINGS) && (
            <ColumnMenuOptions column={column} />
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {column.description}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {column.id}
          </p>
        </div>
      </div>

      {/* Tasks List */}

      <SortableContext
        id={column.id}
        items={columnTasks.map((item) => ({
          ...item,
          id: item.id as UniqueIdentifier,
        }))}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 flex-grow overflow-y-auto overflow-x-hidden space-y-2 p-2  h-full">
          {columnTasks.map((item) => (
            <TaskItem key={item.id} item={item} projectName={projectName} />
          ))}
        </div>
      </SortableContext>

      {/* Add Task Section */}
      <div className="p-2 dark:border-gray-800">
        {showInput ? (
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter task title..."
              className="h-8"
              autoFocus
              disabled={isCreating}
            />
            <Button
              onClick={handleAddItem}
              className={cn(successBtnStyles, 'h-8 px-3')}
              disabled={!inputValue.trim() || isCreating}
            >
              {isCreating ? 'Adding...' : 'Add'}
            </Button>
            <Button
              onClick={() => {
                setShowInput(false);
                setInputValue('');
              }}
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isCreating}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowInput(true)}
            className="w-full h-8 bg-transparent text-gray-500 hover:bg-gray-200 hover:dark:bg-gray-900 dark:text-gray-400 flex justify-start"
          >
            <Plus className="w-4 h-4 mr-2" /> Add item
          </Button>
        )}
      </div>
    </div>
  );
};
