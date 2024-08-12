'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';
import { CustomFieldTagRenderer } from '@/components/CustomFieldTagRenderer';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  item: ITask;
  projectName: string;
  userImageUrl?: string;
}

export const TaskItem = ({ item, projectName, userImageUrl }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
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
        className="min-h-[30px] bg-gray-200 dark:bg-gray-800 rounded-md border border-dashed border-gray-400 mx-2 dark:border-gray-600"
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
        <Avatar className="w-4 h-4 border">
          <AvatarImage
            src={userImageUrl || placeholderUserImageUrl}
            alt="user"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="my-2">
        <TaskDetailsDrawer title={item.title} taskId={item.id} />
      </div>
      <div className="space-x-2">
        <CustomFieldTagRenderer color="hsl(0, 100%, 43%)" label="P0" />
        <CustomFieldTagRenderer color="hsl(240, 14%, 34%)" label="0" />
        <CustomFieldTagRenderer color="hsl(26, 87%, 54%)" label="L" />
      </div>
    </div>
  );
};
