import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { UserAvatar } from '@/components/Avatar';
import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import { useState } from 'react';

export const TaskDescription = () => {
  const [description, setDescription] = useState('');
  const [editable, setEditable] = useState(false);

  return (
    <div className="border border-sky-200 dark:border-blue-900 rounded">
      <div className="flex items-center justify-end bg-sky-100 dark:bg-slate-900 rounded-t border-b border-sky-200 dark:border-blue-900 overflow-x-auto px-4 py-2">
        {/* <div className="flex items-center gap-2 text-sm">
          <UserAvatar className="h-6 w-6 " />
          <span>John123</span>{' '}
          <span className="text-gray-500">opened last week</span>
        </div> */}
        <Button
          variant="ghost"
          className="h-7 p-1 mr-2"
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
            <div className=" flex items-center justify-end space-x-3 pt-2">
              <Button
                className={cn(secondaryBtnStyles, 'h-8')}
                onClick={() => setEditable(false)}
              >
                Cancel
              </Button>
              <Button
                className={cn(successBtnStyles, 'h-8')}
                onClick={() => setEditable(false)}
              >
                Save
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
