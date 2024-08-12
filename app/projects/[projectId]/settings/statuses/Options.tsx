'use client';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import React, { useState } from 'react';

interface Props {
  items: ICustomFieldData[];
}

export const Options = ({ items }: Props) => {
  const [statuses, setStatuses] = useState(items);

  return (
    <div>
      <CustomFieldOptions
        field="status"
        dbTableName="statuses"
        items={statuses}
        setItems={setStatuses}
      />
    </div>
  );
};
