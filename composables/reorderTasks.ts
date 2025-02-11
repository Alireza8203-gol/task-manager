import { toRaw } from "vue";
import type { Task } from "~/types/global";
import updateTask from "~/composables/updateTask";

const reorderTasks = async (DB: IDBDatabase, tasksArray: Task[]) => {
  for (let i = 0; i < tasksArray.length; i++) {
    const rawTask: Task = toRaw(tasksArray[i]);
    const reorderedTask = {
      ...rawTask,
      order: i + 1,
    };
    try {
      await updateTask(DB, reorderedTask);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
};

export default reorderTasks;
