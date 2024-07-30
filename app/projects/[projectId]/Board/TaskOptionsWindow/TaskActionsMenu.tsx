import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Ellipsis, Pen, Trash } from 'lucide-react';

interface Props {
  setIsEditing: (isEditing: boolean) => void;
}
export const TaskActionsMenu = ({ setIsEditing }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="w-6 h-6 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <div className="md:hidden">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <Pen className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>
        <DropdownMenuItem className="text-red-500 bg-transparent hover:bg-red-200 hover:dark:bg-red-950">
          <Trash className="w-3 h-3 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
