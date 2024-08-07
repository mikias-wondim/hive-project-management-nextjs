import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';
import { CustomFieldTagRenderer } from '@/components/CustomFieldTagRenderer';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';

interface Props {
  item: ITask;
  projectName: string;
  userImageUrl?: string;
}

export const TaskItem = ({ item, projectName, userImageUrl }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-3 mx-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm">
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
