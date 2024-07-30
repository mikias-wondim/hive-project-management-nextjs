import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { secondaryBtnStyles, successBtnStyles } from '../commonStyles';

interface Props {
  triggerElem: ReactNode;
}

export const CreateProjectModal = ({ triggerElem }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className={cn(secondaryBtnStyles, 'h-9 px-8 mt-8')}>
        {triggerElem}
      </DialogTrigger>
      <DialogContent className="md:min-w-[700px] lg:min-w-[900px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <div className="my-2">
          <Label>Project Name</Label>
          <Input placeholder="project name" />
        </div>

        <div className="my-2">
          <Label>Project Description</Label>
          <Textarea placeholder="Description" />
        </div>

        <div className="my-2">
          <Label>Project Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kanban Board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Kanban Board</SelectItem>
              <SelectItem value="dark">Team Retrospective</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 min-h-96">
          preview
        </div>

        <DialogFooter>
          <div className="flex justify-end">
            <Button className={cn(successBtnStyles, 'w-28')}>Create</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
