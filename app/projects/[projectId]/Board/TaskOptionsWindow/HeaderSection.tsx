import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { EditableTitle } from './EditableTitle';
import { TaskActionsMenu } from './TaskActionsMenu';

interface Props {
  title: string;
}

export const HeaderSection = ({ title }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <EditableTitle
        title={title}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <div className="flex items-center gap-4">
        <Button
          className="p-1 bg-transparent hover:bg-transparent hidden md:block"
          title="Copy task"
        >
          <Copy className="w-4 h-4 text-gray-600" />
        </Button>

        <TaskActionsMenu setIsEditing={setIsEditing} />
      </div>
    </>
  );
};
