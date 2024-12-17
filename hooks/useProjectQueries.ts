import { useQuery } from '@tanstack/react-query';
import { projects } from '@/utils/projects';

export const useProjectQueries = (projectId: string) => {
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
    members,
    labels,
    statuses,
    priorities,
    sizes,
  };
};
