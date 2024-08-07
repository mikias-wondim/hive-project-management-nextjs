import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  title: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const EditableTitle = ({ title, isEditing, setIsEditing }: Props) => {
  const [text, setText] = useState('Creating a Quote for custom order');

  if (isEditing) {
    return (
      <>
        <div className="flex-grow mr-2">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 rounded p-1 h-8 "
          />
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setIsEditing(false)}
            className={cn(successBtnStyles, 'px-2 md:px-4')}
          >
            <span className="hidden md:inline">Save</span>
            <span className="md:hidden">
              <Check className="w-3 h-3" />
            </span>
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            className={cn(secondaryBtnStyles, 'px-2 md:px-4')}
          >
            <span className="hidden md:inline">Cancel</span>
            <span className="md:hidden">
              <X className="w-3 h-3" />
            </span>
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-grow items-center">
      <h1
        title={title}
        className="text-left text-sm sm:text-md md:text-2xl lg:text-3xl flex-grow truncate"
      >
        {title}
      </h1>
      <Button
        onClick={() => setIsEditing(true)}
        className={cn(secondaryBtnStyles, 'px-2 h-7 hidden md:inline-flex ')}
      >
        Edit
      </Button>
    </div>
  );
};
