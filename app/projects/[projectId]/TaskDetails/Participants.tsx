import { UserCard } from '@/components/UserCard';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useProjectQueries } from '@/hooks/useProjectQueries';
import { useParams } from 'next/navigation';

export const Participants = () => {
  const { projectId } = useParams();
  const { members } = useProjectQueries(projectId as string);
  const { user } = useCurrentUser();

  return (
    <>
      <div className="flex justify-between items-center text-gray-500 pt-4">
        <span className="text-xs">Participants</span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs py-2">
        <UserCard
          id={user?.id || ''}
          name={user?.name || ''}
          avatarUrl={user?.avatar || ''}
          description={user?.description}
          links={user?.links}
          showPreviewName={false}
        />
        {members?.map((member) => (
          <UserCard
            key={member.id}
            id={member.id}
            name={member.name || ''}
            avatarUrl={member.avatar || ''}
            description={member.description}
            links={member.links}
            showPreviewName={false}
          />
        ))}
      </div>
    </>
  );
};
