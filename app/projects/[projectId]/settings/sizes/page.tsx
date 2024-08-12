import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewSize } from './CreateNewSize';
import { Options } from './Options';
import { sizes } from '@/mock-data';

const SizesPage = () => {
  return (
    <SettingsLayout title="Sizes settings">
      <CreateNewSize />
      <Options items={sizes} />
    </SettingsLayout>
  );
};

export default SizesPage;
