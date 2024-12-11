export const users: IUser[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    description: 'Project Manager',
    avatar: 'https://example.com/avatar1.jpg',
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-01-01T00:00:00Z'),
    links: [
      { id: 'link-1', label: 'GitHub', url: 'https://github.com/johndoe' },
      {
        id: 'link-2',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/johndoe',
      },
    ],
    provider: 'google',
  },
  {
    id: 'user-2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    description: 'Developer',
    avatar: 'https://example.com/avatar2.jpg',
    created_at: new Date('2023-01-02T00:00:00Z'),
    updated_at: new Date('2023-01-02T00:00:00Z'),
    links: [
      { id: 'link-3', label: 'GitHub', url: 'https://github.com/janesmith' },
      {
        id: 'link-4',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/janesmith',
      },
    ],
    provider: 'google',
  },
];

export const projects: IProject[] = [
  {
    id: 'project-1',
    name: 'Project Alpha',
    description: 'This is the first project.',
    readme: 'Readme content for Project Alpha.',
    created_by: 'user-1',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    closed: false,
  },
  {
    id: 'project-2',
    name: 'Project Beta',
    description: 'This is the second project.',
    readme: 'Readme content for Project Beta.',
    created_by: 'user-2',
    created_at: new Date('2023-01-07T00:00:00Z'),
    updated_at: new Date('2023-01-08T00:00:00Z'),
    closed: true,
  },
];

export const projectMembers: IProjectMember[] = [
  {
    id: 'pm-1',
    project_id: 'project-1',
    user_id: 'user-1',
    role: 'admin',
    invitationStatus: 'accepted',
    invited_at: new Date('2023-01-05T00:00:00Z'),
    joined_at: new Date('2023-01-06T00:00:00Z'),
  },
  {
    id: 'pm-2',
    project_id: 'project-1',
    user_id: 'user-2',
    role: 'write',
    invitationStatus: 'accepted',
    invited_at: new Date('2023-01-05T00:00:00Z'),
    joined_at: new Date('2023-01-07T00:00:00Z'),
  },
];

export const statuses: IStatus[] = [
  {
    id: 'status-1',
    label: 'Backlog',
    description: 'Tasks that need to be done.',
    color: 'hsl(210, 100%, 50%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
    order: 1,
    limit: 10,
  },
  {
    id: 'status-2',
    label: 'In Progress',
    description: 'Tasks that are being worked on.',
    color: 'hsl(45, 90%, 54%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
    order: 2,
    limit: 5,
  },
];

export const labels: ILabel[] = [
  {
    id: 'label-1',
    label: 'Bug',
    description: "Something isn't working.",
    color: '#dd0101',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'label-2',
    label: 'documentation',
    description: 'Improvements or additions to documentation',
    color: '#007bff',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'label-3',
    label: 'enhancement',
    description: 'New feature or request',
    color: '#728dec',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'label-4',
    label: 'Feature',
    description: 'New feature request.',
    color: '#019335',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
];

export const priorities: IPriority[] = [
  {
    id: 'priority-1',
    label: 'P0',
    description: 'Low priority tasks.',
    color: 'hsl(212, 66%, 50%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'priority-2',
    label: 'P1',
    description: 'High priority tasks.',
    color: 'hsl(353, 65%, 53%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
];

export const sizes: ISize[] = [
  {
    id: 'size-1',
    label: 'S',
    description: 'Small tasks.',
    color: 'hsl(145, 98%, 29%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'size-2',
    label: 'M',
    description: 'Medium tasks.',
    color: 'hsl(212, 66%, 50%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
  {
    id: 'size-3',
    label: 'L',
    description: 'Large tasks.',
    color: 'hsl(274, 100%, 76%)',
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    project_id: 'project-1',
  },
];

export const tasks: ITask[] = [
  {
    id: 'task-1',
    project_id: 'project-1',
    status_id: 'status-1',
    title: 'Fix login bug',
    description: 'There is a bug in the login system.',
    labels: ['label-1', 'label-4'],
    priority: 'priority-2',
    size: 'size-1',
    startDate: new Date('2023-01-10T00:00:00Z'),
    endDate: new Date('2023-01-15T00:00:00Z'),
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    created_by: 'user-2',
  },
  {
    id: 'task-2',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Implement feature X',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-2', 'label-4'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-01-10T00:00:00Z'),
    endDate: new Date('2023-01-20T00:00:00Z'),
    created_at: new Date('2023-01-05T00:00:00Z'),
    updated_at: new Date('2023-01-06T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-3',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Design login page',
    description: 'Implement the new feature X as per requirements.',
    labels: [],
    priority: 'priority-1',
    size: 'size-1',
    startDate: new Date('2023-02-01T00:00:00Z'),
    endDate: new Date('2023-02-10T00:00:00Z'),
    created_at: new Date('2023-01-30T00:00:00Z'),
    updated_at: new Date('2023-01-31T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-4',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Create API for feature Y',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-1'],
    priority: 'priority-1',
    size: 'size-1',
    startDate: new Date('2023-03-15T00:00:00Z'),
    endDate: new Date('2023-03-25T00:00:00Z'),
    created_at: new Date('2023-03-10T00:00:00Z'),
    updated_at: new Date('2023-03-11T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-5',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Optimize database queries',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-3'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-04-05T00:00:00Z'),
    endDate: new Date('2023-04-15T00:00:00Z'),
    created_at: new Date('2023-04-01T00:00:00Z'),
    updated_at: new Date('2023-04-02T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-6',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Write unit tests for module Z',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-4'],
    priority: 'priority-1',
    size: '',
    startDate: new Date('2023-05-12T00:00:00Z'),
    endDate: new Date('2023-05-22T00:00:00Z'),
    created_at: new Date('2023-05-10T00:00:00Z'),
    updated_at: new Date('2023-05-11T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-7',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Fix bug in authentication flow',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-2'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-06-18T00:00:00Z'),
    endDate: new Date('2023-06-28T00:00:00Z'),
    created_at: new Date('2023-06-15T00:00:00Z'),
    updated_at: new Date('2023-06-16T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-8',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Refactor codebase for better readability',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-3'],
    priority: 'priority-1',
    size: 'size-1',
    startDate: new Date('2023-07-20T00:00:00Z'),
    endDate: new Date('2023-07-30T00:00:00Z'),
    created_at: new Date('2023-07-15T00:00:00Z'),
    updated_at: new Date('2023-07-16T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-9',
    project_id: 'project-1',
    status_id: 'status-1',
    title: 'Update documentation for API',
    description: 'Implement the new feature X as per requirements.',
    labels: [],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-08-10T00:00:00Z'),
    endDate: new Date('2023-08-20T00:00:00Z'),
    created_at: new Date('2023-08-05T00:00:00Z'),
    updated_at: new Date('2023-08-06T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-10',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Implement user profile page',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-3'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-09-25T00:00:00Z'),
    endDate: new Date('2023-10-05T00:00:00Z'),
    created_at: new Date('2023-09-20T00:00:00Z'),
    updated_at: new Date('2023-09-21T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-11',
    project_id: 'project-1',
    status_id: 'status-2',
    title: 'Integrate payment gateway',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-2'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-10-15T00:00:00Z'),
    endDate: new Date('2023-10-25T00:00:00Z'),
    created_at: new Date('2023-10-10T00:00:00Z'),
    updated_at: new Date('2023-10-11T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-12',
    project_id: 'project-1',
    status_id: 'status-1',
    title: 'Deploy application to production',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-2'],
    priority: 'priority-1',
    size: 'size-2',
    startDate: new Date('2023-11-01T00:00:00Z'),
    endDate: new Date('2023-11-10T00:00:00Z'),
    created_at: new Date('2023-10-28T00:00:00Z'),
    updated_at: new Date('2023-10-29T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-13',
    project_id: 'project-1',
    status_id: 'status-1',
    title: 'Update XYX',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-3'],
    priority: 'priority-2',
    size: 'size-1',
    startDate: new Date('2023-08-10T00:00:00Z'),
    endDate: new Date('2023-08-20T00:00:00Z'),
    created_at: new Date('2023-08-05T00:00:00Z'),
    updated_at: new Date('2023-08-06T00:00:00Z'),
    created_by: 'user-1',
  },
  {
    id: 'task-14',
    project_id: 'project-1',
    status_id: 'status-1',
    title: 'Update XYX',
    description: 'Implement the new feature X as per requirements.',
    labels: ['label-1'],
    priority: 'priority-1',
    size: 'size-1',
    startDate: new Date('2023-08-10T00:00:00Z'),
    endDate: new Date('2023-08-20T00:00:00Z'),
    created_at: new Date('2023-08-05T00:00:00Z'),
    updated_at: new Date('2023-08-06T00:00:00Z'),
    created_by: 'user-1',
  },
];

export const comments: IComment[] = [
  {
    id: 'comment-1',
    content: 'This needs to be fixed ASAP.',
    user_id: 'user-1',
    task_id: 'task-1',
    created_at: new Date('2023-01-07T00:00:00Z'),
    updated_at: new Date('2023-01-08T00:00:00Z'),
  },
  {
    id: 'comment-2',
    content: 'I will work on this.',
    user_id: 'user-2',
    task_id: 'task-1',
    created_at: new Date('2023-01-09T00:00:00Z'),
    updated_at: new Date('2023-01-09T00:00:00Z'),
  },
];

export const activities: IActivity[] = [
  {
    id: 'activity-1',
    created_at: new Date('2023-01-06T00:00:00Z'),
    user_id: 'user-1',
    task_id: 'task-1',
    content: [
      { type: 'user', id: 'user-1' },
      'moved this item from',
      { type: 'status', id: 'status-1' },
      'to',
      { type: 'status', id: 'status-2' },
      'on',
      { type: 'date', value: '2023-01-06T00:00:00Z' },
    ],
  },
  {
    id: 'activity-1',
    created_at: new Date('2023-01-08T00:00:00Z'),
    user_id: 'user-1',
    task_id: 'task-1',
    content: [
      { type: 'user', id: 'user-1' },
      'added',
      { type: 'labels', ids: ['label-1', 'label-2'] },
      'labels to this item on',
      { type: 'date', value: '2023-01-08T00:00:00Z' },
    ],
  },
];
