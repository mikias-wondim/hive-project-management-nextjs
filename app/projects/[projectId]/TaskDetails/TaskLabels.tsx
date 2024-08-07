import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';

export const TaskLabels = () => (
  <>
    <div className="flex justify-between items-center text-gray-500 pt-4">
      <span className="text-xs">Labels</span>
      <Popover>
        <PopoverTrigger>
          <Settings className="w-4 h-4 " />
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <Label className="mb-2 text-xs">Apply labels to this task</Label>
          <Input
            placeholder="filter labels"
            className="h-7 my-1 rounded-sm bg-gray-100 dark:bg-black"
          />
          <Separator className="my-2" />
          <div className="flex items-start hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 text-xs">
            <Checkbox className="w-4 h-4 mr-4 rounded-sm bg-gray-200 dark:bg-black border border-gray-300 dark:border-gray-900" />
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-500 mr-2 rounded-full" />
              <div>
                <div>bug</div>
                <div className="text-[10] text-gray-400 dark:text-gray-500">
                  Something isn&apos;t working
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div className="text-xs pt-2 pb-4">
      <Badge
        variant="secondary"
        className="text-[11px] bg-cyan-100 text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:bg-cyan-950 border dark:border-cyan-800"
      >
        enhancement
      </Badge>
    </div>
  </>
);
