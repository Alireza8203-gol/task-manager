interface Task {
  id: string;
  title: string;
  order?: number;
  status: string;
  createdAt: string;
  subTasks?: Task[];
}
interface State {
  taskData: Task;
  // loading?: boolean;
  fetchedTasks: Task[];
}

export { Task, State };
