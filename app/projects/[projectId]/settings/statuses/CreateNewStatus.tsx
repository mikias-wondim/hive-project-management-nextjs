import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';

export const CreateNewStatus = () => {
  return (
    <div className={'flex justify-end'}>
      <CreateCustomFieldOptionModal
        title="Create new status"
        dbTableName="statuses"
        triggerLabel="Create new status option"
      />
    </div>
  );
};
