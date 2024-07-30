import { successBtnStyles } from '@/app/commonStyles';
import { UserAvatar } from '@/components/Avatar';
import TextEditor from '@/components/TextEditor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Activities } from './Activities';
import { Assignees } from './Assignees';
import { Comment } from './Comment';
import { HeaderSection } from './HeaderSection';
import { OtherActions } from './OtherActions';
import { Participants } from './Participants';
import { Project } from './Project';
import { TaskDescription } from './TaskDescription';
import { TaskLabels } from './TaskLabels';

interface Props {
  title: string;
}

export const TaskOptionsWindow = ({ title }: Props) => {
  const [comment, setComment] = useState('');

  return (
    <Sheet>
      <SheetTrigger>{title}</SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[550px] md:min-w-[750px] lg:min-w-[70%] dark:bg-gray-950 overflow-y-auto">
        <SheetHeader className="py-4">
          <SheetTitle className="flex items-center justify-between py-2 gap-2">
            <HeaderSection title={title} />
          </SheetTitle>
          <SheetDescription className="text-left">
            <Badge
              variant="outline"
              className="text-[11px] text-gray-500 dark:text-gray-600"
            >
              fmt-design-and-print-board
            </Badge>
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col lg:flex-row py-6 gap-6">
          <div className="flex-grow">
            <p className="font-bold pb-2">Description</p>
            <TaskDescription />
            <div className="border-l pt-4 ml-8">
              <div>
                <Activities />
              </div>

              <div className="bg-white dark:bg-gray-950 my-6 ml-[-2rem]">
                <Comment />
              </div>

              <div className="bg-white dark:bg-gray-950 my-6 ml-[-2rem]">
                <Comment />
              </div>
            </div>

            <div className="my-6">
              <p className="font-bold pb-4 flex items-center space-x-2">
                <UserAvatar /> <span>Add a comment</span>
              </p>
              <TextEditor content={comment} onChange={setComment} isEditable />
              <div className="flex justify-end py-2">
                <Button className={cn(successBtnStyles)}>Add Comment</Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[255px]">
            <Assignees />
            <Separator />
            <TaskLabels />
            <Separator />
            <Project />
            <Separator />
            <Participants />
            <Separator />
            <OtherActions />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
