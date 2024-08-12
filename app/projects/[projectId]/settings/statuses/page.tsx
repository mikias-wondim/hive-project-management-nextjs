import { statuses } from '@/mock-data';
import { SettingsLayout } from '../SettingsLayout';
import { Statuses } from './Statuses';

const StatusesPage = () => {
  return (
    <SettingsLayout title="Status Settings">
      <Statuses items={statuses} />
    </SettingsLayout>
  );
};

export default StatusesPage;
