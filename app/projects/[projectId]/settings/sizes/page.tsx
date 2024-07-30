import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewSize } from './CreateNewSize';

const sizes = [
  {
    id: 'small',
    label: 'S',
    description: '',
    color: 'hsl(156, 87%, 36%)',
  },
  {
    id: 'medium',
    label: 'M',
    description: '',
    color: 'hsl(212, 66%, 50%)',
  },
  {
    id: 'large',
    label: 'L',
    description: '',
    color: 'hsl(45, 90%, 54%)',
  },
  {
    id: 'extra-large',
    label: 'XL',
    description: '',
    color: 'hsl(274, 100%, 76%)',
  },
];

const SizesPage = () => {
  return (
    <SettingsLayout title="Sizes settings">
      <CreateNewSize />
      <CustomFieldOptions field="size" dbTableName="sizes" items={sizes} />
    </SettingsLayout>
  );
};

export default SizesPage;
