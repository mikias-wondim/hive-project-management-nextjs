import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RoleSelect } from './RoleSelect';
import { UserAvatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';

export const ManageAccess = () => {
  return (
    <div>
      <h1 className="text-xl mb-4">Manage access</h1>
      <div className="rounded-md border  overflow-hidden">
        <div className="bg-muted dark:bg-muted/30 flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center gap-4">
            <Checkbox />
            <span className="text-xs">1 member</span>
          </div>

          <Select>
            <SelectTrigger className="w-[90px] h-8 focus:ring-0">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-sm">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="px-4 py-3 border-b">
          <Input
            placeholder="find a user"
            className="h-7 rounded-sm bg-muted/50 dark:bg-muted/20"
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox />
            <div className="flex items-center gap-2">
              <UserAvatar className="h-6 w-6" />
              <p className="text-xs">John Doe</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <RoleSelect />
            <Button
              variant="ghost"
              className="text-xs h-8 hover:border hover:text-red-500"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
