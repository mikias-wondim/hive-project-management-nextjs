interface Task {
  id: string;
  content: string;
}

interface Column {
  name: string;
  description: string;
  limit: number;
  color: string;
  items: Task[];
}

interface Columns {
  [key: string]: Column;
}
