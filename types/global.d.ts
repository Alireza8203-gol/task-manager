interface Task {
  id: string;
  title: string;
  order?: number;
  status: string;
  createdAt: string;
  subTasks?: Task[];
}
interface state {
  taskData: Task;
  loading?: boolean;
  fetchedTasks: Task[];
}

export { Task, state };
