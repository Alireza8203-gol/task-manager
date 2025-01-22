interface Task {
  id: string;
  title: string;
  order?: number;
  status: string;
  createdAt: string;
  subTasks?: Task[];
}

export { Task };
