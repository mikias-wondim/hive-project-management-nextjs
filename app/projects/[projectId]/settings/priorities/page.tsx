import { priorities } from '@/mock-data';
import { SettingsLayout } from '../SettingsLayout';
import { Priorities } from './Priorities';

const PrioritiesPage = () => {
  return (
    <SettingsLayout title="Priorities settings">
      <Priorities items={priorities} />
    </SettingsLayout>
  );
};

export default PrioritiesPage;
