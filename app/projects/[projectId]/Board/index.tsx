'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { ColumnContainer } from './ColumnContainer';
import { initialColumns } from './columnsData';

export const Board: React.FC = () => {
  const [state, setState] = React.useState<Columns>(initialColumns);

  return (
    <div className="flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      {Object.entries(state).map(([columnId, column]) => (
        <ColumnContainer key={columnId} columnId={columnId} column={column} />
      ))}

      <div>
        <Button className="bg-gray-800 w-8 h-8 p-2 border border-gray-700 text-gray-200">
          <Plus />
        </Button>
      </div>
    </div>
  );
};
