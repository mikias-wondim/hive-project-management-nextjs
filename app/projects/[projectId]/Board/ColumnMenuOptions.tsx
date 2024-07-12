import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, EyeOff, Pencil, Plus, Trash } from 'lucide-react';
import { Icons } from '@/components/Icons';

export const ColumnMenuOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel className="text-[11px] text-gray-400 dark:text-gray-500">
          Items
        </DropdownMenuLabel>
        <DropdownMenuItem className="text-red-500">
          <Trash className="w-3 h-3 mr-2" />
          Delete all
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[11px] text-gray-400 dark:text-gray-500">
          Columns
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Icons.number className="w-3 h-3 mr-2 fill-gray-900 dark:fill-slate-50" />
          <span className="text-xs">Set limit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className="w-3 h-3 mr-2" />
          <span className="text-xs">Edit Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeOff className="w-3 h-3 mr-2" />
          <span className="text-xs">Hide from view</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          <Trash className="w-3 h-3 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
