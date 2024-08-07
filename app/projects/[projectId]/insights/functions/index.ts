import { SelectedCustomField } from '@/consts';
import { getTasksByLabel } from './tasks-by-label';
import {
  getTasksByLabelsGroupedByPriority,
  getTasksByLabelsGroupedBySize,
  getTasksByLabelsGroupedByStatus,
} from './tasks-by-label-grouped-by-field';
import { getTasksByPriority } from './tasks-by-priority';
import {
  getTasksByPriorityGroupedByLabels,
  getTasksByPriorityGroupedBySize,
  getTasksByPriorityGroupedByStatus,
} from './tasks-by-priority-grouped-by-field';
import { getTasksBySize } from './tasks-by-size';
import {
  getTasksBySizeGroupedByLabels,
  getTasksBySizeGroupedByStatus,
} from './tasks-by-size-grouped-by-field';
import { getTasksByStatus } from './tasks-by-status';
import {
  getTasksByStatusGroupedByLabels,
  getTasksByStatusGroupedByPriority,
  getTasksByStatusGroupedBySize,
} from './tasks-by-status-grouped-by-field';

type DataGenerator = (tasks: ITask[], ...args: any[]) => any[];

const dataGenerators: { [key: string]: DataGenerator } = {
  'status,none': getTasksByStatus,
  'label,none': getTasksByLabel,
  'size,none': getTasksBySize,
  'priority,none': getTasksByPriority,

  'status,label': getTasksByStatusGroupedByLabels,
  'status,size': getTasksByStatusGroupedBySize,
  'status,priority': getTasksByStatusGroupedByPriority,

  'label,status': getTasksByLabelsGroupedByStatus,
  'label,size': getTasksByLabelsGroupedBySize,
  'label,priority': getTasksByLabelsGroupedByPriority,

  'size,status': getTasksBySizeGroupedByStatus,
  'size,label': getTasksBySizeGroupedByLabels,
  'size,priority': getTasksByStatusGroupedByPriority,

  'priority,status': getTasksByPriorityGroupedByStatus,
  'priority,label': getTasksByPriorityGroupedByLabels,
  'priority,size': getTasksByPriorityGroupedBySize,
};

export function generateChartData(
  xaxis: string,
  groupBy: string,
  tasks: ITask[],
  statuses: IStatus[],
  labels: ILabel[],
  sizes: ISize[],
  priorities: IPriority[]
): any[] {
  const key = `${xaxis},${groupBy}`;
  const dataGenerator = dataGenerators[key];

  if (!dataGenerator) {
    throw new Error(`No data generator found for selected options: ${key}`);
  }

  switch (key) {
    case SelectedCustomField.TasksByStatus:
      return dataGenerator(tasks, statuses);
    case SelectedCustomField.TasksByLabel:
      return dataGenerator(tasks, labels);
    case SelectedCustomField.TasksBySize:
      return dataGenerator(tasks, sizes);
    case SelectedCustomField.TasksByPriority:
      return dataGenerator(tasks, priorities);
    case SelectedCustomField.TasksByStatusGroupedByLabel:
      return dataGenerator(tasks, statuses, labels);
    case SelectedCustomField.TasksByStatusGroupedBySize:
      return dataGenerator(tasks, statuses, sizes);
    case SelectedCustomField.TasksByStatusGroupedByPriority:
      return dataGenerator(tasks, statuses, priorities);
    case SelectedCustomField.TasksByLabelGroupedByStatus:
      return dataGenerator(tasks, labels, statuses);
    case SelectedCustomField.TasksByLabelGroupedBySize:
      return dataGenerator(tasks, labels, sizes);
    case SelectedCustomField.TasksByLabelGroupedByPriority:
      return dataGenerator(tasks, labels, priorities);
    case SelectedCustomField.TasksBySizeGroupedByStatus:
      return dataGenerator(tasks, sizes, statuses);
    case SelectedCustomField.TasksBySizeGroupedByLabel:
      return dataGenerator(tasks, sizes, labels);
    case SelectedCustomField.TasksBySizeGroupedByPriority:
      return dataGenerator(tasks, sizes, priorities);
    case SelectedCustomField.TasksByPriorityGroupedByStatus:
      return dataGenerator(tasks, priorities, statuses);
    case SelectedCustomField.TasksByPriorityGroupedByLabel:
      return dataGenerator(tasks, priorities, labels);
    case SelectedCustomField.TasksByPriorityGroupedBySize:
      return dataGenerator(tasks, priorities, sizes);
    default:
      throw new Error(
        `Unhandled data generation case for selected options: ${key}`
      );
  }
}
