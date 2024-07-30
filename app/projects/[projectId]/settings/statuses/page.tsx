import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewStatus } from './CreateNewStatus';

const statuses = [
  {
    id: 'backlog',
    label: 'Backlog',
    description: "This item hasn't been started",
    color: 'hsl(156, 87%, 36%)',
  },
  {
    id: 'ready',
    label: 'Ready',
    description: 'This is ready to be picked up',
    color: 'hsl(212, 66%, 50%)',
  },
  {
    id: 'in-progress',
    label: 'In progress',
    description: 'This is actively being worked on',
    color: 'hsl(45, 90%, 54%)',
  },
  {
    id: 'in-review',
    label: 'In review',
    description: 'This item is in review',
    color: 'hsl(274, 100%, 76%)',
  },
  {
    id: 'done',
    label: 'Done',
    description: 'This has been completed',
    color: 'hsl(0, 100%, 43%)',
  },
];

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
