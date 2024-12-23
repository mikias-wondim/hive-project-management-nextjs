import { CustomFieldTagRenderer } from '@/components/CustomFieldTagRenderer';
import { LabelBadge } from '@/components/LabelBadge';
import { UserCard } from '@/components/UserCard';
import { labels, statuses } from '@/mock-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC } from 'react';

// Helper components for each activity type
const User = ({ id }: { id: string }) => {
  // Replace with actual logic to fetch user details

  return (
    <UserCard
      id={id}
      name="John Doe"
      avatarUrl=""
      description="Software Engineer | Frontend Engineer | React | Angular | Typescript"
    />
  );
};

const Users = ({ ids }: { ids: string[] }) => {
  // Replace with actual logic to fetch multiple user details

  return (
    <span>
      {ids.map((id) => (
        <UserCard
          key={id}
          id={id}
          name="John Doe"
          avatarUrl=""
          description="Software Engineer | Frontend Engineer | React | Angular | Typescript"
        />
      ))}
    </span>
  );
};

const StatusBadge = ({ id }: { id: string }) => {
  const params = useParams();
  // Replace with actual logic to fetch status details
  const status = statuses.find((status) => status.id === id);
  if (!status) {
    return null;
  }
  return (
    <Link
      href={`/projects/${params.projectId}/settings/statuses?option_id=${status.id}`}
    >
      <CustomFieldTagRenderer label={status.label} color={status.color} />
    </Link>
  );
};

const LabelRenderer = ({ id }: { id: string }) => {
  const params = useParams();
  // Replace with actual logic to fetch label details
  const label = labels.find((label) => label.id === id);

  if (!label) {
    return null;
  }

  return (
    <Link
      href={`/projects/${params.projectId}/settings/labels?label_id=${label.id}`}
    >
      <LabelBadge
        labelText={label.label}
        description={label.description}
        color={label.color}
      />
    </Link>
  );
};

const LabelsRenderer = ({ ids }: { ids: string[] }) => {
  const params = useParams();

  // Replace with actual logic to fetch multiple labels details
  const fetchedLabels = labels.filter((label) => ids.includes(label.id));

  return fetchedLabels.map((label) => (
    <Link
      key={label.id}
      href={`/projects/${params.projectId}/settings/labels?label_id=${label.id}`}
    >
      <LabelBadge
        labelText={label.label}
        description={label.description}
        color={label.color}
      />
    </Link>
  ));
};

const DateRenderer = ({ value }: { value: Date | string }) => {
  const formattedDate = new Date(value).toDateString();
  return <span>{formattedDate}</span>;
};

// Define the props and task activity types
interface ActivityRendererProps {
  activity: IActivity;
}

const ActivityRenderer: FC<ActivityRendererProps> = ({ activity }) => {
  return (
    <div className="flex items-center flex-wrap text-xs gap-1 ml-3">
      {activity.content.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <span key={index} className="text-gray-400">
              {item}
            </span>
          );
        }

        switch (item.type) {
          case 'user':
            return <User key={index} id={item.id} />;
          case 'status':
            return <StatusBadge key={index} id={item.id} />;
          case 'label':
            return <LabelRenderer key={index} id={item.id} />;
          case 'labels':
            return <LabelsRenderer key={index} ids={item.ids} />;
          case 'date':
            return <DateRenderer key={index} value={item.value} />;
          case 'users':
            return <Users key={index} ids={item.ids} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ActivityRenderer;
