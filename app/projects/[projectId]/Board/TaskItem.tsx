'use client';
import { CustomFieldTagRenderer } from '@/components/CustomFieldTagRenderer';
import { LabelBadge } from '@/components/LabelBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { placeholderUserImageUrl } from '@/consts';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';

interface Props {
  item: ITaskWithOptions;
  projectName: string;
}

export const TaskItem = ({ item, projectName }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id as UniqueIdentifier,
    data: {
      type: 'task',
      task: item,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[95%] min-h-[30px] bg-gray-200 dark:bg-gray-800 rounded-md border border-dashed border-gray-400 mx-2 dark:border-gray-600"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-900 px-4 py-3 mx-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
    >
      <div className="flex justify-between">
        <span className="text-[11px] text-gray-400 dark:text-gray-400">
          {projectName}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-4 h-4 border">
                <AvatarImage
                  src={item.creator?.avatar || placeholderUserImageUrl}
                  alt={item.creator?.name || 'User'}
                />
                <AvatarFallback>
                  {item.creator?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.creator?.name || 'Unknown user'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="my-2">
        <TaskDetailsDrawer title={item.title || ''} taskId={item.id || ''} />
      </div>
      <div className="space-x-2">
        {item.priority && (
          <CustomFieldTagRenderer
            color={item.priority.color}
            label={item.priority.label}
          />
        )}
        {item.size && (
          <CustomFieldTagRenderer
            color={item.size.color}
            label={item.size.label}
          />
        )}
        {item.labels?.map((label) => (
          <LabelBadge
            key={label.id}
            color={label.color}
            labelText={label.label}
          />
        ))}
      </div>
    </div>
  );
};
