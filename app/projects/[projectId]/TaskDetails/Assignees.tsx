import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { placeholderUserImageUrl } from '@/consts';
import { Settings } from 'lucide-react';

export const Assignees = () => (
  <>
    <div className="flex justify-between items-center text-gray-500">
      <span className="text-xs">Assignees</span>
      <Popover>
        <PopoverTrigger>
          <Settings className="w-4 h-4 " />
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <Label className="mb-2 text-xs">Assign people to this task</Label>
          <Input
            placeholder="filter assignees"
            className="h-7 my-1 rounded-sm bg-gray-100 dark:bg-black"
          />
          <Separator className="my-2" />
          <div className="flex items-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 text-xs">
            <Checkbox className="w-4 h-4 mr-4 rounded-sm bg-gray-200 dark:bg-black border border-gray-300 dark:border-gray-900" />
            <Avatar className="w-4 h-4 mr-2">
              <AvatarImage src={placeholderUserImageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>User name</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div className="text-xs pt-2 pb-4">
      No one -
      <Button className="px-1 text-blue-500 bg-transparent text-xs h-4 font-normal hover:bg-transparent">
        Assign yourself
      </Button>
    </div>
  </>
);
