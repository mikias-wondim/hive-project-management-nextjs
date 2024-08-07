import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TaskDetails } from '../TaskDetails';
import { HeaderSection } from '../TaskDetails/HeaderSection';

interface Props {
  title: string;
  taskId: string;
}

export const TaskDetailsDrawer = ({ title, taskId }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>{title}</SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[550px] md:min-w-[750px] lg:min-w-[70%] dark:bg-gray-950 overflow-y-auto">
        <SheetHeader className="py-4">
          <SheetTitle className="flex items-center justify-between py-2">
            <HeaderSection title={title} taskId={taskId} />
          </SheetTitle>
          <SheetDescription className="text-left" asChild>
            <Badge
              variant="outline"
              className="text-[11px] text-gray-500 dark:text-gray-600 w-fit"
            >
              fmt-design-and-print-board
            </Badge>
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <TaskDetails />
      </SheetContent>
    </Sheet>
  );
};
