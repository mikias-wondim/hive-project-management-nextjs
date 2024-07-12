import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className=" flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold">ProjeX</h1>

      <div className="flex items-center space-x-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};
