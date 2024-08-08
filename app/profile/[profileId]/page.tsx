import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const ProfileViewingPage = () => {
  return (
    <div className="w-[24rem] md:w-[36rem]  mx-auto px-6 pb-4">
      <h1 className="text-2xl py-6">John Doe</h1>
      <Avatar className="w-48 h-48">
        <AvatarImage src="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-lg pt-6 pb-2 font-bold">Bio</h1>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quia
          provident nisi eaque, voluptas quibusdam rerum libero commodi, sit
          repellat soluta enim doloremque ut eum consequuntur aliquam. Expedita,
          cupiditate cum.
        </p>
      </div>

      <div>
        <h1 className="text-lg pt-6 pb-2 font-bold">URLs</h1>
        <a
          href="https://example.com/username"
          target="_blank"
          className="text-blue-600"
        >
          https://example.com/username
        </a>
      </div>
    </div>
  );
};

export default ProfileViewingPage;
