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
  params: { projectId: string };
}

const ProjectDetailsPage = ({ params }: Props) => {
  return (
    <div className="h-minus-135">
      <div className="flex justify-between items-center gap-6 bg-white dark:bg-gray-950  border py-4 px-8 h-[63px]">
        <h1
          title="Project name"
          className="text-xl text-gray-700 dark:text-gray-300 truncate"
        >
          Project Name
        </h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
              <Ellipsis className="text-gray-600 dark:text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <Link href={`/projects/${params.projectId}/settings`}>
                <DropdownMenuItem className="text-gray-600 dark:text-gray-400">
                  <Settings className="w-3 h-3 mr-2" />
                  <span className="text-xs">Settings</span>
                </DropdownMenuItem>
              </Link>

              <Link href={`/projects/${params.projectId}/insights`}>
                <DropdownMenuItem className="text-gray-600 dark:text-gray-400">
                  <LineChart className="w-3 h-3 mr-2" />
                  <span className="text-xs">Insights</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Board />
    </div>
  );
};

export default ProjectDetailsPage;
