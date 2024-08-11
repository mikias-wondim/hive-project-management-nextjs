'use client';
import { successBtnStyles } from '@/app/commonStyles';
import { CreateOrEditLabelForm } from '@/components/CreateOrEditLabelForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export const CreateNewLabel = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="flex justify-end py-4">
        <Button className={cn(successBtnStyles)} onClick={() => setShow(true)}>
          New label
        </Button>
      </div>

      {show && <CreateOrEditLabelForm cancel={() => setShow(false)} />}
    </div>
  );
};
