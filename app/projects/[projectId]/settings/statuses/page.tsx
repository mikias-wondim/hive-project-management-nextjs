import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewStatus } from './CreateNewStatus';
import { statuses } from '@/mock-data';
import { Options } from './Options';

const StatusesPage = () => {
  return (
    <SettingsLayout title="Status Settings">
      <CreateNewStatus />
      <Options items={statuses} />
    </SettingsLayout>
  );
};

export default StatusesPage;
