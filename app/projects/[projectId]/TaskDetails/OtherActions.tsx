import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

export const OtherActions = () => (
  <div className="py-4">
    <Button className="flex h-6 justify-start w-full text-red-500 bg-transparent hover:bg-red-200 hover:dark:bg-red-950">
      <Trash className="w-3 h-3 mr-2" />
      Delete
    </Button>
  </div>
);
