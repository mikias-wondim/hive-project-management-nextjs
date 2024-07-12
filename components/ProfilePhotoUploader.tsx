import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export const ProfilePhotoUploader = () => {
  return (
    <div className="w-fit relative">
      <Avatar className="w-48 h-48">
        <AvatarImage src="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button className="w-8 h-8 p-2 rounded-full bg-blue-500 text-white absolute right-[-15px] top-[60%]">
        <Plus />
      </Button>
    </div>
  );
};
