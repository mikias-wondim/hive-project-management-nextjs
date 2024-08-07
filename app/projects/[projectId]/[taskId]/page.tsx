import React from 'react';
import { TaskDetails } from '../TaskDetails';
import { HeaderSection } from '../TaskDetails/HeaderSection';
import { Separator } from '@/components/ui/separator';

interface Props {
  params: {
    taskId: string;
  };
}
const TaskDetailsPage = ({ params }: Props) => {
  return (
    <div className="container py-4">
      <div className="flex">
        <HeaderSection title={'Task title here'} taskId="" hideCopyLink />
      </div>
      <div className="text-left text-sm text-gray-500 dark:text-gray-400 w-fit my-2">
        <span className="font-bold">John Doe</span> created this task on{' '}
        {new Date().toDateString()}
      </div>
      <Separator className="my-3" />
      <TaskDetails />
    </div>
  );
};

export default TaskDetailsPage;
