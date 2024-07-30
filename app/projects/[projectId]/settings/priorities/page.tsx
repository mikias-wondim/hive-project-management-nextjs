import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewPriority } from './CreateNewPriority';

const items = [
  {
    id: 'p-0',
    label: 'P0',
    description: '',
    color: 'hsl(156, 87%, 36%)',
  },
  {
    id: 'p-1',
    label: 'P1',
    description: '',
    color: 'hsl(212, 66%, 50%)',
  },
  {
    id: 'p-2',
    label: 'P2',
    description: '',
    color: 'hsl(45, 90%, 54%)',
  },
  {
    id: 'p-3',
    label: 'P3',
    description: '',
    color: 'hsl(274, 100%, 76%)',
  },
];

const PrioritiesPage = () => {
  return (
    <SettingsLayout title="Priorities settings">
      <CreateNewPriority />
      <CustomFieldOptions
        field="priority"
        dbTableName="priorities"
        items={items}
      />
    </SettingsLayout>
  );
};

export default PrioritiesPage;
