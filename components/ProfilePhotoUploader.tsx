import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { primaryBtnStyles } from '@/app/commonStyles';

export const ProfilePhotoUploader = () => {
  return (
    <div className="w-fit relative">
      <Avatar className="w-48 h-48">
        <AvatarImage src="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button
        className={cn(
          primaryBtnStyles,
          'w-8 h-8 p-2 rounded-full absolute right-[-15px] top-[60%]'
        )}
      >
        <Plus />
      </Button>
    </div>
  );
};
