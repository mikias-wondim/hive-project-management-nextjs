interface ITasksBySize {
  name: string;
  count: number;
}

export function getTasksBySize(tasks: ITask[], sizes: ISize[]): ITasksBySize[] {
  const sizeMap = new Map<string, number>();

  sizes.forEach((size) => sizeMap.set(size.id, 0));

  tasks.forEach((task) => {
    if (sizeMap.has(task.size)) {
      sizeMap.set(task.size, (sizeMap.get(task.size) || 0) + 1);
    }
  });

  return sizes.map((size) => ({
    name: size.label,
    count: sizeMap.get(size.id) || 0,
  }));
}
