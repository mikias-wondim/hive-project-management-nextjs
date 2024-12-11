import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, LineChart, Settings } from 'lucide-react';
import Link from 'next/link';
import { Board } from './Board';

interface Props {
  params: Promise<{ projectId: string }>;
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const { projectId } = await params;
  const supabase = await createClient();

  // Load project details
  const { data: project, error } = await supabase
    .from('projects')
    .select(
      `
      name,
      statuses (
        id,
        label,
        description,
        color,
        order,
        limit
      )
    `
    )
    .eq('id', projectId)
    .single();

  if (error || !project) redirect('/projects');

  console.log(project);

  return (
    <div className="h-minus-135">
      <div className="flex justify-between items-center gap-6 bg-white dark:bg-gray-950 border py-4 px-8 h-[63px]">
        <h1
          title={project.name}
          className="text-xl text-gray-700 dark:text-gray-300 truncate"
        >
          {project.name}
        </h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
              <Ellipsis className="text-gray-600 dark:text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <Link href={`/projects/${projectId}/settings`}>
                <DropdownMenuItem className="text-gray-600 dark:text-gray-400">
                  <Settings className="w-3 h-3 mr-2" />
                  <span className="text-xs">Settings</span>
                </DropdownMenuItem>
              </Link>

              <Link href={`/projects/${projectId}/insights`}>
                <DropdownMenuItem className="text-gray-600 dark:text-gray-400">
                  <LineChart className="w-3 h-3 mr-2" />
                  <span className="text-xs">Insights</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Board
        projectId={projectId}
        projectName={project.name}
        statuses={project.statuses as IStatus[]}
      />
    </div>
  );
};

export default ProjectDetailsPage;
