'use client';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';

export const CreateNewSize = () => {
  return (
    <div className={'flex justify-end'}>
      <CreateCustomFieldOptionModal
        title="Create new size"
        dbTableName="sizes"
        triggerLabel="Create new size option"
      />
    </div>
  );
};
