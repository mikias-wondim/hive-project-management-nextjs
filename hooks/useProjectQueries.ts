import { useQuery, useQueryClient } from '@tanstack/react-query';
import { projects } from '@/utils/projects';
import { tasks } from '@/utils/tasks';

export const useProjectQueries = (projectId: string) => {
  const queryClient = useQueryClient();

  // Fetch project tasks
  const { data: projectTasks, refetch } = useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: () => tasks.board.getProjectTasks(projectId),
    enabled: !!projectId,
  });

  // Function to invalidate and reload project tasks
  const reloadProjectTasks = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['project-tasks', projectId],
    });
    return refetch(); // This returns a promise that resolves when the data is refetched
  };

  // Fetch project members
  const { data: members } = useQuery({
    queryKey: ['project-members', projectId],
    queryFn: () => projects.members.getAll(projectId),
    enabled: !!projectId,
  });

  // Fetch project labels
  const { data: labels } = useQuery({
    queryKey: ['project-labels', projectId],
    queryFn: () => projects.fields.getLabels(projectId),
    enabled: !!projectId,
  });

  // Fetch project statuses
  const { data: statuses } = useQuery({
    queryKey: ['project-statuses', projectId],
    queryFn: () => projects.fields.getStatuses(projectId),
    enabled: !!projectId,
  });

  // Fetch project priorities
  const { data: priorities } = useQuery({
    queryKey: ['project-priorities', projectId],
    queryFn: () => projects.fields.getPriorities(projectId),
    enabled: !!projectId,
  });

  // Fetch project sizes
  const { data: sizes } = useQuery({
    queryKey: ['project-sizes', projectId],
    queryFn: () => projects.fields.getSizes(projectId),
    enabled: !!projectId,
  });

  return {
    projectTasks,
    reloadProjectTasks,
    members,
    labels,
    statuses,
    priorities,
    sizes,
  };
};
