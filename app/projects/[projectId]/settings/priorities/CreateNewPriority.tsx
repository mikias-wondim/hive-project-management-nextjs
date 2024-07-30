'use client';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';

export const CreateNewPriority = () => {
  return (
    <div className={'flex justify-end'}>
      <CreateCustomFieldOptionModal
        title="Create new priority"
        dbTableName="priorities"
        triggerLabel="Create new priority option"
      />
    </div>
  );
};
