'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export const ProjectSettingsForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1 max-w-80">
        <Label className="text-xs">Project name</Label>
        <Input
          defaultValue="FMT Design and Print"
          placeholder="Name of project"
        />
      </div>

      <div className="space-y-1 max-w-[28rem]">
        <Label className="text-xs">Short description</Label>
        <Textarea
          placeholder="A short description about this project"
          rows={8}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">README</Label>
        <TextEditor
          content=""
          onChange={(text) => console.log(text)}
          isEditable
        />
      </div>
      <Button className={cn(secondaryBtnStyles, 'text-black')}>
        Save changes
      </Button>
    </div>
  );
};
