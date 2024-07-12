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
        </TabsList>

        <TabsContent value="my-projects">
          <SearchAndButton placeholderText="Search my projects" />
          <ProjectList />
        </TabsContent>
        <TabsContent value="all-projects">
          <SearchAndButton />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const projects = [
  {
    name: 'FMT Design and Print',
    description: 'E-commerce platform for FMT Design and Print',
    status: 'Private',
    updated: 'updated yesterday',
    type: {
      label: 'Team Retrospective',
      value: 'retro',
    },
  },
  {
    name: 'Drone Hub Kanban',
    description: '',
    status: 'Private',
    updated: 'updated on Feb 7, 2023',
    type: {
      label: 'Kanban board',
      value: 'kanban',
    },
  },
];

const ProjectList = () => {
  return (
    <div className="border rounded-md">
      <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-6">
        <div>
          <span className="text-sm">Projects(2)</span>
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
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 border-b flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{project.name}</span>
                <Badge className="text-xs bg-transparent dark:bg-transparent border border-gray-300 text-gray-400 dark:text-gray-600 font-normal">
                  {project.type.label}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {project.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                {project.updated}
              </p>
            </div>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className=" font-bold">
                  . . .
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
