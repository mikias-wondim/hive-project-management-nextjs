import { createClient } from './supabase/client';

const supabase = createClient();

export const tasks = {
  async createTask(task: Partial<ITask>) {
    const { data: createdTask, error } = await supabase
      .from('tasks')
      .insert(task)
      .select(
        `
        *,
        creator:created_by (
          id,
          name,
          avatar
        )
      `
      )
      .single();

    if (error) throw error;
    return createdTask as ITaskWithOptions;
  },

  async updateTask(taskId: string, updates: Partial<ITask>) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) throw error;
    return data as ITask;
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) throw error;
  },

  async getProjectTasks(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ITask[];
  },

  async moveTask(taskId: string, statusId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        status_id: statusId,
        updated_at: new Date(),
      })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) throw error;
    return data as ITask;
  },

  async getProjectTasksWithOptions(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select(
        `
        id,
        title,
        status_id,
        statusPosition,
        creator:created_by ( id, name, avatar ),
        size ( id, label, color ),
        priority ( id, label, color, order ),
        task_labels (
            labels (
                id,
                label,
                color
            )
        )
      `
      )
      .eq('project_id', projectId);

    if (error) throw error;

    return data.map((task) => ({
      ...task,
      labels: task.task_labels?.map((tl) => tl.labels) || [],
      task_labels: null,
    })) as any[];
  },

  async updateTaskPosition(taskId: string, statusPosition: number) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        statusPosition,
        updated_at: new Date(),
      })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) throw error;
    return data as ITask;
  },

  async moveTaskWithPosition(
    taskId: string,
    statusId: string,
    statusPosition: number
  ) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        status_id: statusId,
        statusPosition,
        updated_at: new Date(),
      })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) throw error;
    return data as ITask;
  },
};
