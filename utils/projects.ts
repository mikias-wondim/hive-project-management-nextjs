import { createClient } from './supabase/client';

const supabase = createClient();

export const projects = {
  async getUserProjects(userId: string) {
    const [ownedProjects, memberProjects] = await Promise.all([
      // Get projects created by user
      supabase
        .from('projects')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false }),

      // Get projects where user is a member
      supabase
        .from('project_members')
        .select(
          `
          project:projects (*)
        `
        )
        .eq('user_id', userId)
        .eq('invitationStatus', 'accepted')
        .order('created_at', { ascending: false })
        .not('project.created_by', 'eq', userId),
    ]);

    if (ownedProjects.error) throw ownedProjects.error;
    if (memberProjects.error) throw memberProjects.error;

    // Combine and deduplicate projects
    const allProjects = [
      ...ownedProjects.data,
      ...memberProjects.data.map((row) => row.project),
    ];

    return allProjects as IProject[];
  },

  async createProject(projectData: ProjectWithOptions, userId: string) {
    try {
      // 1. Create the project first
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          name: projectData.name,
          description: projectData.description,
          readme: projectData.readme,
          created_by: userId,
          updated_at: new Date(),
          closed: false,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // 2. If not skipping default options, create them
      if (projectData.statuses) {
        const { error: statusError } = await supabase.from('statuses').insert(
          projectData.statuses.map((status, index) => ({
            ...status,
            project_id: project.id,
            order: index,
            limit: 5,
            updated_at: new Date(),
          }))
        );
        if (statusError) throw statusError;
      }

      if (projectData.labels) {
        const { error: labelError } = await supabase.from('labels').insert(
          projectData.labels.map((label) => ({
            ...label,
            project_id: project.id,
            updated_at: new Date(),
          }))
        );
        if (labelError) throw labelError;
      }

      if (projectData.priorities) {
        const { error: priorityError } = await supabase
          .from('priorities')
          .insert(
            projectData.priorities.map((priority) => ({
              ...priority,
              project_id: project.id,
              updated_at: new Date(),
            }))
          );
        if (priorityError) throw priorityError;
      }

      if (projectData.sizes) {
        const { error: sizeError } = await supabase.from('sizes').insert(
          projectData.sizes.map((size) => ({
            ...size,
            project_id: project.id,
            updated_at: new Date(),
          }))
        );
        if (sizeError) throw sizeError;
      }

      return project;
    } catch (error) {
      throw error;
    }
  },

  async closeProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .update({
        closed: true,
        updated_at: new Date(),
      })
      .eq('id', projectId);

    if (error) throw error;
  },

  async reopenProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .update({
        closed: false,
        updated_at: new Date(),
      })
      .eq('id', projectId);

    if (error) throw error;
  },

  async deleteProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  },

  async updateProject(projectId: string, updates: Partial<IProject>) {
    const { error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date(),
      })
      .eq('id', projectId);

    if (error) throw error;
  },
};
