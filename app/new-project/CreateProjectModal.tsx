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
import { ReactNode } from 'react';

interface Props {
  triggerElem: ReactNode;
}

export const CreateProjectModal = ({ triggerElem }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{triggerElem}</DialogTrigger>
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
            <Button className="bg-green-500 text-white min-w-36 h-9">
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
