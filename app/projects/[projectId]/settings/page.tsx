import { Button } from '@/components/ui/button';
import { ProjectSettingsForm } from './ProjectSettingsForm';
import { SettingsLayout } from './SettingsLayout';
import { cn } from '@/lib/utils';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { Separator } from '@/components/ui/separator';

const SettingsPage = () => {
  return (
    <SettingsLayout title="Projects Settings">
      <ProjectSettingsForm />
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
            >
              Delete this project
            </Button>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsPage;
