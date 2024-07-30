'use client';
import { successBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { RoleSelect } from './RoleSelect';

export const InviteUsers = () => {
  return (
    <div className="py-8">
      <h1 className="text-xl mb-4">Invite users</h1>
      <div className="flex items-center gap-2">
        <div className="relative ml-auto flex-1">
          <User className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            type="Search by username"
            placeholder="Search..."
            className="w-full rounded-sm bg-background pl-8 h-8"
          />
        </div>
        <RoleSelect />
        <Button className={cn(successBtnStyles, 'px-3')}>Invite</Button>
      </div>
    </div>
  );
};
