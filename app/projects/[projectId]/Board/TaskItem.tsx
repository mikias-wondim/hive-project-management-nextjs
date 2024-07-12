import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';
import React from 'react';

interface Props {
  item: Task;
  projectName: string;
  userImageUrl?: string;
}

export const TaskItem = ({ item, projectName, userImageUrl }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 px-4 pt-3 mx-2 pb-6 rounded-md border border-gray-300 dark:border-gray-700 text-sm">
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
      {item.content}
    </div>
  );
};
