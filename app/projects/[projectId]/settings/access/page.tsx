import { SettingsLayout } from '../SettingsLayout';
import { InviteUsers } from './InviteUsers';
import { ManageAccess } from './ManageAccess';

const AccessPage = () => {
  return (
    <SettingsLayout title="Who has access">
      <div className="p-4 rounded-sm bg-muted dark:bg-muted/50 text-sm">
        Only those with access to this project can view it.
      </div>
      <InviteUsers />
      <ManageAccess />
    </SettingsLayout>
  );
};

export default AccessPage;
