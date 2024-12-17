'use client';
import { useTaskDetails } from '../Board/TaskDetailsContext';
import { useTaskQueries } from '@/hooks/useTaskQueries';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

export const OtherActions = () => {
  const { selectedTask, closeDrawer } = useTaskDetails();
  const { deleteTask } = useTaskQueries(selectedTask?.id || '');

  const handleDelete = async () => {
    await deleteTask();
    closeDrawer();
  };

  return (
    <div className="py-4">
      <Button
        onClick={handleDelete}
        className="flex h-6 justify-start w-full text-red-500 bg-transparent hover:bg-red-200 hover:dark:bg-red-950"
      >
        <Trash className="w-3 h-3 mr-2" />
        Delete
      </Button>
    </div>
  );
};
