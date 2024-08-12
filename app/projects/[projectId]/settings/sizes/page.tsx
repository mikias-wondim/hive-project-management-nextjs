import { sizes } from '@/mock-data';
import { SettingsLayout } from '../SettingsLayout';
import { Sizes } from './Sizes';

const SizesPage = () => {
  return (
    <SettingsLayout title="Sizes settings">
      <Sizes items={sizes} />
    </SettingsLayout>
  );
};

export default SizesPage;
