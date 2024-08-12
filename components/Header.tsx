import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className=" flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <Link href="/">
        <h1 className="text-xl font-bold">ProjeX</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};
