"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, LineChart, Settings } from "lucide-react";
import Link from "next/link";
import { Board } from "./Board";
import { useProjectAccess } from "@/hooks/useProjectAccess";
import { ProjectAction } from "@/consts";
import { useState } from "react";

interface ProjectDetailsProps {
  projectId: string;
  projectName: string;
  projectDescription?: string;
  statuses: IStatus[];
}

export const ProjectDetails = ({
  projectId,
  projectName,
  projectDescription,
  statuses,
}: ProjectDetailsProps) => {
  const { can } = useProjectAccess({ projectId });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col">
      <div className="flex justify-between items-center gap-6 bg-white dark:bg-gray-950 border py-4 px-8">
        <div className="flex flex-col gap-1">
          <h1
            title={projectName}
            className="text-xl text-gray-700 dark:text-gray-300 truncate"
          >
            {projectName}{" "}
            <button
              onClick={toggleCollapse}
              className="text-xs text-gray-600 dark:text-gray-400"
            >
              {isCollapsed ? "Show Details" : "Hide Details"}
            </button>
          </h1>
          {!isCollapsed && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {projectDescription}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nam
              in rem obcaecati reiciendis facilis sit beatae facere,
              voluptatibus itaque modi nulla vero dignissimos molestias
              necessitatibus quaerat! Consectetur, maxime obcaecati? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dignissimos incidunt
              amet dolore iure magni, dicta ab quis aut doloremque voluptates
              expedita itaque debitis illum repellendus iusto blanditiis dolores
              voluptate nemo?
            </span>
          )}
        </div>

        {can(ProjectAction.VIEW_SETTINGS) && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                <Ellipsis className="text-gray-600 dark:text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <Link href={`/projects/${projectId}/settings`}>
                  <DropdownMenuItem className="text-gray-600 dark:text-gray-400 cursor-pointer">
                    <Settings className="w-3 h-3 mr-2" />
                    <span className="text-xs">Settings</span>
                  </DropdownMenuItem>
                </Link>

                <Link href={`/projects/${projectId}/insights`}>
                  <DropdownMenuItem className="text-gray-600 dark:text-gray-400 cursor-pointer">
                    <LineChart className="w-3 h-3 mr-2" />
                    <span className="text-xs">Insights</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <Board
          projectId={projectId}
          projectName={projectName}
          statuses={statuses}
        />
      </div>
    </div>
  );
};
