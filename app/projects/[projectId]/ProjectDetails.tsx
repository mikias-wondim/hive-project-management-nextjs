"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, EyeOff, LineChart, Settings } from "lucide-react";
import Link from "next/link";
import { Board } from "./Board";
import { useProjectAccess } from "@/hooks/useProjectAccess";
import { ProjectAction } from "@/consts";
import { useState } from "react";
import RichTextDisplay from "@/components/RichTextDisplay";

interface ProjectDetailsProps {
  projectId: string;
  projectName: string;
  projectDescription?: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
  projectReadme: string;
  statuses: IStatus[];
}

export const ProjectDetails = ({
  projectId,
  projectName,
  projectDescription,
  projectCreatedAt,
  projectUpdatedAt,
  projectReadme,
  statuses,
}: ProjectDetailsProps) => {
  const { can } = useProjectAccess({ projectId });
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col">
      <div className="flex justify-between items-start gap-6 bg-white dark:bg-gray-950 border py-4 px-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h1 className="text-xl text-gray-700 dark:text-gray-300 truncate">
              {projectName}
            </h1>
            <button
              onClick={toggleCollapse}
              className="ml-2 text-xs text-gray-600 dark:text-gray-400"
            >
              {isCollapsed ? (
                <Eye className="w-fit h-4" />
              ) : (
                <EyeOff className="w-fit h-4" />
              )}
            </button>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col gap-1 max-w-[500px] text-xs text-gray-500 dark:text-gray-400">
              <span className="text-sm">{projectDescription}</span>
              <div className="my-2 flex gap-2 justify-between">
                <span className=" ">
                  Created at: {new Date(projectCreatedAt).toLocaleDateString()},{" "}
                  {new Date(projectCreatedAt).toLocaleTimeString()}
                </span>
                <span className="">
                  Updated at: {new Date(projectUpdatedAt).toLocaleDateString()},{" "}
                  {new Date(projectUpdatedAt).toLocaleTimeString()}
                </span>
              </div>
              <RichTextDisplay text={projectReadme} size="lg" />
            </div>
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

      <div className="flex-1 overflow-y-auto px-[10px]">
        <Board
          projectId={projectId}
          projectName={projectName}
          statuses={statuses}
        />
      </div>
    </div>
  );
};
