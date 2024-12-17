'use client';
import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { UserAvatar } from '@/components/Avatar';
import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { useTaskDetails } from '../Board/TaskDetailsContext';
import { formatRelativeTime } from '@/utils/date';
import { useTaskQueries } from '@/hooks/useTaskQueries';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const TaskDescription = () => {
  const { selectedTask } = useTaskDetails();
  const { task, updateDescription } = useTaskQueries(selectedTask?.id || '');
  const [description, setDescription] = useState(task?.description || '');
  const [editable, setEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedTask?.id) return;
    try {
      setIsSaving(true);
      await updateDescription(description);
      setEditable(false);
    } catch (error) {
      console.error('Failed to save description:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDescription(task?.description || '');
    setEditable(false);
  };

  return (
    <div className="border border-sky-200 dark:border-blue-900 rounded">
      <div className="flex items-center justify-end bg-sky-100 dark:bg-slate-900 rounded-t border-b border-sky-200 dark:border-blue-900 overflow-x-auto px-4 py-2">
        <div className="flex justify-between items-center gap-2 text-sm">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserAvatar
                  src={task?.creator?.avatar}
                  fallback={task?.creator?.name?.charAt(0)}
                  className="h-5 w-5"
                />
                <div className="text-xs">{task?.creator?.name}</div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex items-center gap-2">
                <UserAvatar
                  src={selectedTask?.creator?.avatar}
                  fallback={selectedTask?.creator?.name?.charAt(0)}
                  className="h-8 w-8"
                />
                <h4 className="text-sm font-semibold">
                  {selectedTask?.creator?.name}
                </h4>
              </div>

              <div className="py-2">
                <p className="text-sm text-muted-foreground">
                  {task?.creator?.description}
                </p>

                {task?.creator?.links && task?.creator?.links.length > 0 && (
                  <Separator className="my-2" />
                )}

                <div className="flex items-center">
                  {task?.creator?.links.map((link) => (
                    <div key={link.id}>
                      <Link
                        href={link.url}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-sky-500"
                      >
                        {link.label}
                      </Link>
                      <span className="text-xs text-muted-foreground px-3">
                        |
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <span className="text-gray-500 text-xs">
            opened {formatRelativeTime(task?.created_at!)}
          </span>
        </div>
        <Button
          variant="ghost"
          className="h-7 py-1 px-2 mx-2 text-xs"
          onClick={() => setEditable(true)}
        >
          <Pen className="h-3 w-3 mr-2" />
          Edit
        </Button>
      </div>

      <div className="p-2 min-h-[120px]">
        {editable ? (
          <div>
            <div className="min-h-[180px]">
              <TextEditor
                content={description}
                onChange={setDescription}
                isEditable={editable}
              />
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                className={cn(secondaryBtnStyles, 'h-8')}
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                className={cn(successBtnStyles, 'h-8')}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        ) : (
          <TextEditor
            content={
              description ||
              '<p><em><sub>No Description Provided</sub></em></p>'
            }
            onChange={setDescription}
            isEditable={false}
          />
        )}
      </div>
    </div>
  );
};
