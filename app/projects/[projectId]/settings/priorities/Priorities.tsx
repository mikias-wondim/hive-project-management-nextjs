'use client';
import { primaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { Button } from '@/components/ui/button';
import { cn, compareArrays } from '@/lib/utils';
import React, { useState } from 'react';
import { v4 as uid } from 'uuid';

interface Props {
  items: ICustomFieldData[];
}

export const Priorities = ({ items }: Props) => {
  const [priorities, setPriorities] = useState(items);

  const comparisonResults = compareArrays(items, priorities);

  const handleSaveData = () => {
    console.log('save data', priorities);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateCustomFieldOptionModal
          title="Create new priority"
          triggerLabel="Create new priority option"
          handleSubmit={(data) =>
            setPriorities((items) => [...items, { id: uid(), ...data }])
          }
        />
      </div>

      <CustomFieldOptions
        field="priority"
        dbTableName="priorities"
        items={priorities}
        setItems={setPriorities}
      />

      <div className="flex justify-end py-4">
        <Button
          onClick={handleSaveData}
          className={cn(primaryBtnStyles)}
          disabled={!comparisonResults.isChanged}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
