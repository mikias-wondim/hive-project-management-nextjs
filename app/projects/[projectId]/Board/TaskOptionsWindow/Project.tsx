import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from './DatePicker';

export const Project = () => (
  <>
    <div className="text-gray-500 py-4">
      <span className="text-xs">Project</span>
    </div>

    <div className="flex gap-8 items-center text-gray-500">
      <span className="text-xs">Status</span>
      <Badge
        variant="secondary"
        className="text-[11px] bg-blue-100 text-blue-700 border-blue-300 dark:text-blue-300 dark:bg-blue-950 border dark:border-blue-800"
      >
        Ready
      </Badge>
    </div>

    <div className="flex justify-between text-gray-500 py-2">
      <span className="text-xs">Priority</span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="text-xs">Filter options</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel className="mb-2 text-xs">
            Select an Item
          </DropdownMenuLabel>
          <Input
            placeholder="filter options"
            className="h-7 my-1 rounded-sm bg-gray-100 dark:bg-black"
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-red-500 rounded-full" />
            <div className="flex-grow">
              P0
              <Separator />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-orange-500 rounded-full" />
            <div className="flex-grow">
              P1
              <Separator />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-yellow-500 rounded-full" />
            <div className="flex-grow">
              P2
              <Separator />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="flex justify-between text-gray-500 py-2">
      <span className="text-xs">Size</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="text-xs">Filter options</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel className="mb-2 text-xs">
            Select an Item
          </DropdownMenuLabel>
          <Input
            placeholder="filter options"
            className="h-7 my-1 rounded-sm bg-gray-100 dark:bg-black"
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-green-500 rounded-full" />
            <div className="flex-grow">
              XS
              <Separator />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-indigo-500 rounded-full" />
            <div className="flex-grow">
              S<Separator />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-orange-500 rounded-full" />
            <div className="flex-grow">
              M<Separator />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-yellow-500 rounded-full" />
            <div className="flex-grow">
              L<Separator />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-3 h-3 mr-2 border border-pink-500 rounded-full" />
            <div className="flex-grow">XL</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="flex justify-between text-gray-500 py-2">
      <span className="text-xs">Start date</span>
      <DatePicker />
    </div>

    <div className="flex justify-between text-gray-500 pt-2 pb-4">
      <span className="text-xs">End date</span>
      <DatePicker />
    </div>
  </>
);
