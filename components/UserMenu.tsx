import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUser, CreditCard, LogOut, Plus, UserIcon } from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
export default function UserMenu() {
  const handleLogout = () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUser className="h-8 w-fit cursor-pointer" />
        <span className="sr-only">User Menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56 p-2" align="end">
        <DropdownMenuLabel className="font-normal mb-2">
          <div className="flex flex-col space-y-1 mx-2">
            <p className="text-sm font-medium leading-none">Mikias Wondim</p>
            <p className="text-xs leading-none text-muted-foreground">
              mikias@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="h-0.5 w-full bg-muted" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="w-full cursor-pointer">
              <UserIcon className="w-4 h-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/projects" className="cursor-pointer">
              <CreditCard className="w-4 h-4 mr-2" />
              Projects
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="h-0.5 w-full bg-muted" />

        <DropdownMenuItem asChild>
          <Link href="/logout" className="w-full cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="h-0.5 w-full bg-muted" />

        <DropdownMenuItem
          className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 w-full cursor-pointer"
          onSelect={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
