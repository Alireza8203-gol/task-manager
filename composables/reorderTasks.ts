import { toRaw } from "vue";
import type { Task } from "~/types/global";

const reorderTasks = async (DB: IDBDatabase, tasksArray: Task[]) => {
  try {
    const result = await clearAllTasks(DB);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  for (let i = 0; i < tasksArray.length; i++) {
    const rawTask: Task = toRaw(tasksArray[i]);
    const reorderedTask = {
      ...rawTask,
      order: i + 1,
    };
    console.log(reorderedTask);
    try {
      const res = await updateTask(DB, reorderedTask);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
};

export default reorderTasks;
