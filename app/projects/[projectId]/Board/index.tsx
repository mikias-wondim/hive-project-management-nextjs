'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { ColumnContainer } from './ColumnContainer';
import { statuses } from '@/mock-data';

export const Board: React.FC = () => {
  return (
    <div className="flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      {statuses.map((column) => (
        <ColumnContainer key={column.id} column={column} />
      ))}

      <div>
        <Button className="bg-gray-200 dark:bg-gray-800 w-8 h-8 p-2 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-200">
          <Plus />
        </Button>
      </div>
    </div>
  );
};
