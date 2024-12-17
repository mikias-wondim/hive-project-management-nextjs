'use client';
import { useTaskDetails } from '../Board/TaskDetailsContext';
import { useProjectQueries } from '@/hooks/useProjectQueries';
import { useTaskQueries } from '@/hooks/useTaskQueries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useParams } from 'next/navigation';

export const Assignees = () => {
  const params = useParams();
  const { selectedTask } = useTaskDetails();
  const { members } = useProjectQueries(params.projectId as string);
  const { task, updateAssignees } = useTaskQueries(selectedTask?.id || '');
  const { userId, user } = useCurrentUser();

  const [filter, setFilter] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize selected assignees when task loads or changes
  useEffect(() => {
    if (task?.assignees) {
      setSelectedAssignees(task.assignees.map((a) => a.id));
    }
  }, [task?.assignees]);

  // Combine project members with current user if not already included
  const allMembers = useMemo(() => {
    if (!members || !user) return members;
    const isCurrentUserMember = members.some((m) => m.id === userId);
    return isCurrentUserMember ? members : [...members, user];
  }, [members, user, userId]);

  const handleAssigneeToggle = (userId: string) => {
    setSelectedAssignees((prev) => {
      const isCurrentlySelected = prev.includes(userId);
      return isCurrentlySelected
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];
    });
  };

  const handlePopoverOpenChange = (open: boolean) => {
    if (
      !open &&
      JSON.stringify(selectedAssignees.sort()) !==
        JSON.stringify(task?.assignees?.map((a) => a.id).sort())
    ) {
      updateAssignees(selectedAssignees);
    }
    setIsOpen(open);
  };

  const handleAssignSelf = () => {
    if (userId) {
      setSelectedAssignees([userId]);
      updateAssignees([userId]);
    }
  };

  const filteredMembers = allMembers?.filter((member) =>
    member.name.toLowerCase().includes(filter.toLowerCase())
  );

  const isAssigned = (userId: string) => selectedAssignees.includes(userId);

  return (
    <>
      <div className="flex justify-between items-center text-gray-500">
        <span className="text-xs">Assignees</span>
        <Popover open={isOpen} onOpenChange={handlePopoverOpenChange}>
          <PopoverTrigger>
            <Settings className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="mr-4">
            <Label className="mb-2 text-xs">Assign people to this task</Label>
            <Input
              placeholder="filter assignees"
              className="h-7 my-1 rounded-sm bg-gray-100 dark:bg-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Separator className="my-2" />
            {filteredMembers?.map((member) => (
              <div
                key={member.id}
                className="flex items-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 text-xs"
                onClick={() => handleAssigneeToggle(member.id)}
              >
                <Checkbox
                  checked={isAssigned(member.id)}
                  className="w-4 h-4 mr-4 rounded-sm bg-gray-200 dark:bg-black border border-gray-300 dark:border-gray-900"
                />
                <Avatar className="w-4 h-4 mr-2">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-xs pt-2 pb-4">
        {task?.assignees && task.assignees.length > 0 ? (
          <div className="space-y-2">
            {task.assignees.map((assignee) => (
              <div key={assignee.id} className="flex items-center gap-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={assignee.avatar} />
                  <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{assignee.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            No one -
            <Button
              onClick={handleAssignSelf}
              className="px-1 text-blue-500 bg-transparent text-xs h-4 font-normal hover:bg-transparent"
            >
              Assign yourself
            </Button>
          </>
        )}
      </div>
    </>
  );
};
