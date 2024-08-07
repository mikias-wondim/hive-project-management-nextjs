export const placeholderUserImageUrl = 'https://github.com/shadcn.png';

export enum SelectedCustomField {
  TasksByStatus = 'status,none',
  TasksByLabel = 'label,none',
  TasksBySize = 'size,none',
  TasksByPriority = 'priority,none',

  TasksByStatusGroupedByLabel = 'status,label',
  TasksByStatusGroupedBySize = 'status,size',
  TasksByStatusGroupedByPriority = 'status,priority',

  TasksByLabelGroupedByStatus = 'label,status',
  TasksByLabelGroupedBySize = 'label,size',
  TasksByLabelGroupedByPriority = 'label,priority',

  TasksBySizeGroupedByStatus = 'size,status',
  TasksBySizeGroupedByLabel = 'size,label',
  TasksBySizeGroupedByPriority = 'size,priority',

  TasksByPriorityGroupedByStatus = 'priority,status',
  TasksByPriorityGroupedByLabel = 'priority,label',
  TasksByPriorityGroupedBySize = 'priority,size',
}
