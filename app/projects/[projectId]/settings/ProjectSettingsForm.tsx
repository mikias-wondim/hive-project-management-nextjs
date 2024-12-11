'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { projects } from '@/utils/projects';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloseProjectDialog } from '../../components/CloseProjectDialog';
import { DeleteProjectDialog } from '../../components/DeleteProjectDialog';
import TextEditor from '@/components/TextEditor';

interface ProjectSettingsFormProps {
  project: IProject;
}

export function ProjectSettingsForm({ project }: ProjectSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    readme: project.readme,
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateProject = async () => {
    try {
      setIsLoading(true);
      await projects.updateProject(project.id, formData);
      toast({
        title: 'Success',
        description: 'Project settings updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update project settings',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseProject = async () => {
    try {
      await projects.closeProject(project.id);
      toast({
        title: 'Success',
        description: 'Project closed successfully',
      });
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to close project',
      });
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projects.deleteProject(project.id);
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete project',
      });
    }
  };

  return (
    <>
      <div className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>README</Label>
          <TextEditor
            content={formData.readme}
            onChange={(text) =>
              setFormData((prev) => ({ ...prev, readme: text }))
            }
            isEditable
          />
        </div>

        <Button
          onClick={handleUpdateProject}
          disabled={isLoading}
          className={cn(secondaryBtnStyles)}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="my-20">
        <h1 className="text-xl my-3">Danger zone</h1>
        <div className="border border-red-500 rounded-md">
          <div className="flex justify-between items-center px-4 py-3">
            <div>
              <p className="text-sm font-medium">Close Project</p>
              <p className="text-sm text-gray-800 dark:text-gray-400">
                Closing a project will disable its workflows & remove it from
                the list of open projects.
              </p>
            </div>
            <Button
              className={cn(
                secondaryBtnStyles,
                'text-red-500 dark:text-red-400'
              )}
              onClick={() => setShowCloseDialog(true)}
            >
              Close this project
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center px-4 py-3">
            <div>
              <p className="text-sm font-medium">Delete Project</p>
              <p className="text-sm text-gray-800 dark:text-gray-400">
                Once you delete a project, there is no going back. Please be
                certain.
              </p>
            </div>
            <Button
              className={cn(
                secondaryBtnStyles,
                'text-red-500 dark:text-red-400'
              )}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete this project
            </Button>
          </div>
        </div>
      </div>

      <CloseProjectDialog
        open={showCloseDialog}
        onOpenChange={setShowCloseDialog}
        onConfirm={handleCloseProject}
      />

      <DeleteProjectDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteProject}
        projectName={project.name}
      />
    </>
  );
}
