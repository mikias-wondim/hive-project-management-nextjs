type Role = 'read' | 'write' | 'admin';
type InvitationStatus = 'invited' | 'accepted' | 'declined' | 'expired';

type ChartLayout =
  | 'bar'
  | 'column'
  | 'line'
  | 'stacked-area'
  | 'stacked-bar'
  | 'stacked-column';

type CustomField = 'status' | 'label' | 'size' | 'priority';

interface IUserLink {
  id: string;
  label: string;
  url: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  description: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  links: IUserLink[];
}

interface IProject {
  id: string;
  name: string;
  description: string;
  readme: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  closed: boolean;
}

interface IProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: Role;
  invitationStatus: InvitationStatus;
  invited_at: Date;
  joined_at: Date;
}

interface IField {
  id: string;
  label: string;
  description: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  project_id: string;
}

interface IStatus extends IField {
  order: number;
  limit: number;
}

interface ILabel extends IField {}
interface IPriority extends IField {}
interface ISize extends IField {}

interface ITask {
  id: string;
  project_id: string;
  status_id: string;
  title: string;
  description: string;
  labels: string[];
  priority: string;
  size: string;
  startDate: Date;
  endDate: Date;
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

interface IComment {
  id: string;
  content: string;
  user_id: string;
  task_id: string;
  created_at: Date;
  updated_at: Date;
}

type ActivityType = 'status' | 'label' | 'labels' | 'date' | 'user' | 'users';
type ActivityPayload = 'id' | 'value' | 'ids';

type ActivityObject =
  | { type: 'status'; id: string }
  | { type: 'label'; id: string }
  | { type: 'labels'; ids: string[] }
  | { type: 'date'; value: string }
  | { type: 'user'; id: string }
  | { type: 'users'; ids: string[] };

type TaskActivity = (string | ActivityObject)[];

interface IActivity {
  id: string;
  created_at: Date;
  content: TaskActivity;
  user_id: string;
  task_id: string;
  created_at: Date;
}

type TimelineType = 'activity' | 'comment';
interface ITimeline {
  id: string;
  created_at: Date;
  type: TimelineType;
  value: IActivity | IComment;
}

type CustomFieldDBTableName = 'statuses' | 'labels' | 'priorities' | 'sizes';

// ------------------------------
interface ICustomFieldData {
  id: string;
  label?: string;
  color?: string;
  description?: string;
}

// tables ----------------
//  - users
//  - projects
//  - project_members
//  - statuses
//  - labels
//  - priorities
//  - sizes
//  - tasks
//  - comments
//  - activities
