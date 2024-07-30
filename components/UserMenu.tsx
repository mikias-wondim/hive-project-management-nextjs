import {
  CircleUser,
  CreditCard,
  LogOut,
  Plus,
  User,
  UserPlus,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from './Avatar';
import Link from 'next/link';
import { Button } from './ui/button';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-gray-100 dark:bg-gray-700"
        >
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="pb-0">John Doe</DropdownMenuLabel>
        <div className="dark:text-gray-300 text-xs px-2 pb-2">
          (john@projx.com)
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Your Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/projects">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Your Projects</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuItem>
          <Link href="/new-project">
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Project</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
