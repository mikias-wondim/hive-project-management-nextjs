import React from 'react';
import SearchAndButton from './Search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, PanelsTopLeft, SquareKanban } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { deleteBtnStyles } from '../commonStyles';
import { projects } from '@/mock-data';
import Link from 'next/link';

export const Projects = () => {
  return (
    <div>
      <Tabs defaultValue="my-projects">
        <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-none ">
          <TabsTrigger value="my-projects">
            <PanelsTopLeft className="w-4 h-4 mr-2" />
            <span>My Projects</span>
          </TabsTrigger>
          <TabsTrigger value="all-projects">
            <SquareKanban className="w-4 h-4 mr-2" />
            <span>All Projects</span>
          </TabsTrigger>
          <TabsTrigger value="closed-projects">
            <SquareKanban className="w-4 h-4 mr-2" />
            <span>Closed Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects">
          <SearchAndButton placeholderText="Search my projects" />
          <ProjectList tab="mine" />
        </TabsContent>
        <TabsContent value="all-projects">
          <SearchAndButton />
          <ProjectList tab="all" />
        </TabsContent>
        <TabsContent value="closed-projects">
          <SearchAndButton placeholderText="Search closed projects" />
          <ProjectList tab="closed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProjectListProps {
  tab: 'mine' | 'all' | 'closed';
}

const ProjectList = ({ tab }: ProjectListProps) => {
  const availableProjects =
    tab === 'mine' || tab === 'all'
      ? projects.filter((project) => !project.closed)
      : tab === 'closed'
      ? projects.filter((project) => project.closed)
      : [];

  return (
    <div className="border rounded-md">
      <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-6">
        <div>
          {tab === 'mine' && (
            <span className="text-sm">
              My Projects({availableProjects.length})
            </span>
          )}
          {tab === 'all' && (
            <span className="text-sm">
              All Projects({availableProjects.length})
            </span>
          )}
          {tab === 'closed' && (
            <span className="text-sm">
              Closed Projects({availableProjects.length})
            </span>
          )}
        </div>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <span className="text-sm">Sort</span>{' '}
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        {availableProjects.map((project, index) => (
          <div
            key={index}
            className="p-6 border-b flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/projects/${project.id}`}>
                  <h1 className="text-lg font-semibold">{project.name}</h1>
                </Link>
                {/* <Badge className="text-xs bg-transparent dark:bg-transparent border border-gray-300 text-gray-400 dark:text-gray-600 font-normal">
                  {project.type.label}
                </Badge> */}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {project.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                {new Date(project.updated_at).toDateString()}
              </p>
            </div>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className=" font-bold">
                  . . .
                </DropdownMenuTrigger>
                {tab === 'closed' ? (
                  <DropdownMenuContent>
                    <DropdownMenuItem>ReOpen</DropdownMenuItem>
                    <DropdownMenuItem className={cn(deleteBtnStyles)}>
                      Delete Permanently
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                ) : (
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className={cn(deleteBtnStyles)}>
                      Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
