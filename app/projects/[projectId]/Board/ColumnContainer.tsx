import React from 'react';
import { ColumnMenuOptions } from './ColumnMenuOptions';
import { TaskItem } from './TaskItem';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { projects, tasks } from '@/mock-data';

interface Props {
  column: IStatus;
}

export const ColumnContainer = ({ column }: Props) => {
  const items = tasks.filter((task) => task.status_id === column.id);
  const projectName = projects.filter(
    (project) => project.id === column.project_id
  )[0].name;

  return (
    <div className="w-[350px] flex-shrink-0 bg-gray-100 dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800">
      <div className="p-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-4 h-4 rounded-full bg-transparent border-2',
                column.color
              )}
            />
            <h1 className="text-sm font-bold">{column.label}</h1>
            <div className="px-2 h-4 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 rounded-full flex justify-center items-center text-[10px]">
              {items.length} / {column.limit}
            </div>
          </div>
          <ColumnMenuOptions />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {column.description}
        </div>
      </div>

      <div className="space-y-2 py-1 h-minus-270 overflow-y-auto">
        {items.map((item) => (
          <TaskItem key={item.id} item={item} projectName={projectName} />
        ))}
      </div>

      <Button className="w-full rounded-s bg-transparent text-gray-500 hover:bg-gray-200 hover:dark:bg-gray-900 dark:text-gray-400 flex justify-start">
        <Plus className="w-4 h-4 mr-2" /> Add item
      </Button>
    </div>
  );
};
