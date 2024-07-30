import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { UserAvatar } from '@/components/Avatar';
import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Ellipsis, Pen, Trash } from 'lucide-react';
import { useState } from 'react';

export const Comment = () => {
  const [description, setDescription] = useState('Some Comment');
  const [editable, setEditable] = useState(false);

  return (
    <div className="border border-sky-200 dark:border-blue-900 rounded">
      <div className="flex items-center justify-between bg-sky-100 dark:bg-slate-900 rounded-t border-b border-sky-200 dark:border-blue-900 overflow-x-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <UserAvatar className="h-6 w-6 " />
          <span>John123</span> <span className="text-gray-500">yesterday</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="w-6 h-6 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuItem onClick={() => setEditable(true)}>
              <Pen className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-500 bg-transparent hover:bg-red-200 hover:dark:bg-red-950">
              <Trash className="w-3 h-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-2 min-h-[120px]">
        {editable ? (
          <div>
            <div className="min-h-[180px]">
              <TextEditor
                content={description}
                onChange={setDescription}
                isEditable={editable}
              />
            </div>
            <div className=" flex items-center justify-end space-x-3 pt-2">
              <Button
                className={cn(secondaryBtnStyles, 'h-8')}
                onClick={() => setEditable(false)}
              >
                Cancel
              </Button>
              <Button
                className={cn(successBtnStyles, 'h-8')}
                onClick={() => setEditable(false)}
              >
                Update Comment
              </Button>
            </div>
          </div>
        ) : (
          <TextEditor
            content={description}
            onChange={setDescription}
            isEditable={false}
          />
        )}
      </div>
    </div>
  );
};
