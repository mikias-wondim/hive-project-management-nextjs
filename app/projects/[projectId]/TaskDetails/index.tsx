'use client';
import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { TaskDescription } from './TaskDescription';
import { getTimelineItems } from '@/lib/get-timeline-items';
import ActivityRenderer from './ActivityRenderer';
import { Comment } from './Comment';
import { UserAvatar } from '@/components/Avatar';
import { successBtnStyles } from '@/app/commonStyles';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Assignees } from './Assignees';
import { OtherActions } from './OtherActions';
import { Participants } from './Participants';
import { Project } from './Project';
import { TaskLabels } from './TaskLabels';

const timelineItems = getTimelineItems();

export const TaskDetails = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="flex flex-col lg:flex-row py-6 gap-6">
      <div className="flex-grow">
        <p className="font-bold pb-2">Description</p>
        <TaskDescription />
        <div className="border-l pt-4 ml-8">
          {timelineItems.map((item) =>
            item.type === 'activity' ? (
              <ActivityRenderer
                key={item.id}
                activity={item.value as IActivity}
              />
            ) : (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-950 my-6 ml-[-2rem]"
              >
                <Comment comment={item.value as IComment} />
              </div>
            )
          )}
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
  );
};
