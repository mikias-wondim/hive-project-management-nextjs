import { defaultLabels } from '@/consts/default-options';
import { SettingsLayout } from '../SettingsLayout';
import { CreateNewLabel } from './CreateNewLabel';
import { LabelList } from './LabelList';

const PrioritiesPage = () => {
  return (
    <SettingsLayout title="Labels settings">
      <CreateNewLabel />

      <div className="rounded-md border  overflow-hidden">
        <div className="bg-muted dark:bg-muted/20 flex justify-between items-center px-4 py-4 border-b">
          <div>
            <span className="text-xs">{defaultLabels.length} labels</span>
          </div>
        </div>
        <LabelList labels={defaultLabels} />
      </div>
    </SettingsLayout>
  );
};

export default PrioritiesPage;
