'use client';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import React, { useState } from 'react';

interface Props {
  items: ICustomFieldData[];
}

export const Options = ({ items }: Props) => {
  const [sizes, setSizes] = useState(items);

  return (
    <div>
      <CustomFieldOptions
        field="size"
        dbTableName="sizes"
        items={sizes}
        setItems={setSizes}
      />
    </div>
  );
};
