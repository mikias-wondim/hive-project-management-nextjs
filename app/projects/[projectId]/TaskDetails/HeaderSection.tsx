'use client';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { EditableTitle } from './EditableTitle';
import { TaskActionsMenu } from './TaskActionsMenu';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { usePathname } from 'next/navigation';

interface Props {
  title: string;
  taskId: string;
  hideCopyLink?: boolean;
}

export const HeaderSection = ({
  title,
  taskId,
  hideCopyLink = false,
}: Props) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const { isCopied, handleCopy } = useCopyToClipboard();

  const permalink = `${location?.origin}${pathname}/${taskId}`;

  return (
    <>
      <EditableTitle
        title={title}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {!hideCopyLink && (
        <div className="flex items-center gap-3 ml-4">
          <Button
            className="p-1 bg-transparent hover:bg-transparent hidden md:block"
            title="Copy permalink"
            onClick={() => handleCopy(permalink)}
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </Button>

          <TaskActionsMenu setIsEditing={setIsEditing} permalink={permalink} />
        </div>
      )}
    </>
  );
};
