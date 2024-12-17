'use client';
import { useTaskDetails } from '../Board/TaskDetailsContext';
import { useProjectQueries } from '@/hooks/useProjectQueries';
import { useTaskQueries, DateUpdates } from '@/hooks/useTaskQueries';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DatePicker } from './DatePicker';
import { CustomFieldTagRenderer } from '@/components/CustomFieldTagRenderer';

export const Project = () => {
  const params = useParams();
  const { selectedTask, updateTaskSize, updateTaskPriority } = useTaskDetails();
  const { statuses, priorities, sizes } = useProjectQueries(
    params.projectId as string
  );
  const { task, updatePriority, updateSize, updateDates } = useTaskQueries(
    selectedTask?.id || ''
  );

  const handlePrioritySelect = (priorityId: string | null) => {
    if (!selectedTask?.id) return;
    updatePriority(priorityId || '');
    const priority = priorityId
      ? priorities?.find((p) => p.id === priorityId) || null
      : null;
    updateTaskPriority?.(selectedTask.id, priority);
  };

  const handleSizeSelect = (sizeId: string | null) => {
    if (!selectedTask?.id) return;
    updateSize(sizeId || '');
    const size = sizeId ? sizes?.find((s) => s.id === sizeId) || null : null;
    updateTaskSize?.(selectedTask.id, size);
  };

  const handleDateChange = (
    type: 'startDate' | 'endDate',
    date: Date | undefined
  ) => {
    if (!selectedTask?.id) return;

    const updates: DateUpdates = {
      startDate:
        type === 'startDate'
          ? date?.toISOString() || null
          : (task?.startDate as any) || null,
      endDate:
        type === 'endDate'
          ? date?.toISOString() || null
          : (task?.endDate as any) || null,
    };
    updateDates(updates);
  };

  const currentStatus = statuses?.find((s) => s.id === task?.status_id);

  const startDate = task?.startDate ? new Date(task.startDate) : undefined;
  const endDate = task?.endDate ? new Date(task.endDate) : undefined;

  return (
    <>
      <div className="text-gray-500 py-4">
        <span className="text-xs">Project</span>
      </div>

      <div className="flex gap-8 items-center text-gray-500">
        <span className="text-xs">Status</span>
        <Badge
          variant="secondary"
          className="text-[11px] bg-blue-100 text-blue-700 border-blue-300 dark:text-blue-300 dark:bg-blue-950 border dark:border-blue-800"
        >
          {currentStatus?.label || 'None'}
        </Badge>
      </div>

      <div className="flex justify-between text-gray-500 py-2">
        <span className="text-xs">Priority</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs">
            {task?.priority ? (
              <CustomFieldTagRenderer
                color={task.priority.color}
                label={task.priority.label}
              />
            ) : (
              'None'
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel className="text-xs">
              Set Priority
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handlePrioritySelect(null)}>
              <span className="w-3 h-3 mr-2" />
              <div className="flex-grow">None</div>
            </DropdownMenuItem>
            {priorities?.map((priority) => (
              <DropdownMenuItem
                key={priority.id}
                onClick={() => handlePrioritySelect(priority.id)}
              >
                <span
                  className="w-3 h-3 mr-2 border rounded-full"
                  style={{ borderColor: priority.color }}
                />
                <div className="flex-grow">{priority.label}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between text-gray-500 py-2">
        <span className="text-xs">Size</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs">
            {task?.size ? (
              <CustomFieldTagRenderer
                color={task.size.color}
                label={task.size.label}
              />
            ) : (
              'None'
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel className="text-xs">Set Size</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSizeSelect(null)}>
              <span className="w-3 h-3 mr-2" />
              <div className="flex-grow">None</div>
            </DropdownMenuItem>
            {sizes?.map((size) => (
              <DropdownMenuItem
                key={size.id}
                onClick={() => handleSizeSelect(size.id)}
              >
                <span
                  className="w-3 h-3 mr-2 border rounded-full"
                  style={{ borderColor: size.color }}
                />
                <div className="flex-grow">{size.label}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between text-gray-500 py-2">
        <span className="text-xs">Start date</span>
        <DatePicker
          date={startDate}
          onSelect={(date) => handleDateChange('startDate', date)}
        />
      </div>

      <div className="flex justify-between text-gray-500 pt-2 pb-4">
        <span className="text-xs">End date</span>
        <DatePicker
          date={endDate}
          onSelect={(date) => handleDateChange('endDate', date)}
        />
      </div>
    </>
  );
};
