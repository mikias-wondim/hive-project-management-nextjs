import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewStatus } from './CreateNewStatus';
import { statuses } from '@/mock-data';

const StatusesPage = () => {
  return (
    <SettingsLayout title="Status Settings">
      <CreateNewStatus />
      <CustomFieldOptions
        field="status"
        dbTableName="statuses"
        items={statuses}
      />
    </SettingsLayout>
  );
};

export default StatusesPage;
