'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { statuses } from '@/mock-data';
import { cn } from '@/lib/utils';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { ColumnContainer } from './ColumnContainer';

export const Board: React.FC = () => {
  return (
    <div className="relative flex flex-nowrap space-x-4 p-4 overflow-x-auto w-full h-minus-135">
      {statuses.map((column) => (
        <ColumnContainer key={column.id} column={column} />
      ))}

      <CreateCustomFieldOptionModal
        title="New Column"
        dbTableName="statuses"
        triggerBtn={
          <Button className={cn(secondaryBtnStyles, 'w-8 h-8 p-2 ')}>
            <Plus />
          </Button>
        }
      ></CreateCustomFieldOptionModal>
    </div>
  );
};
