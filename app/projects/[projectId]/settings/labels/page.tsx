import { SettingsLayout } from '../SettingsLayout';
import { CreateOrEditLabel } from './CreateOrEditLabel';
import { LabelList } from './LabelList';

const PrioritiesPage = () => {
  return (
    <SettingsLayout title="Labels settings">
      <CreateOrEditLabel />

      <div className="rounded-md border  overflow-hidden">
        <div className="bg-muted dark:bg-muted/20 flex justify-between items-center px-4 py-4 border-b">
          <div>
            <span className="text-xs">10 labels</span>
          </div>
        </div>
        <LabelList />
      </div>
    </SettingsLayout>
  );
};

export default PrioritiesPage;
