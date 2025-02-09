import { toRaw } from "vue";
import type { Task } from "~/types/global";
import updateTask from "~/composables/updateTask";
import reorderTasks from "~/composables/reorderTasks";
import convertToRawObject from "~/composables/convertToRawObject";

const updateTasksLoop = async (
  tasks: Task[],
  db: IDBDatabase,
): Promise<void> => {
  for (let i: number = 0; i < tasks.length; i++) {
    const rawTaskObject = tasks.map((taskObject: Task) => {
      return convertToRawObject(taskObject);
    });
    const task: Task = rawTaskObject[i];
    const withReorderedSubTasks: Task | undefined = reorderTasks(task);
    const reorderedTask = {
      ...withReorderedSubTasks,
      order: i + 1,
    };
    // console.log("reordered Task", reorderedTask);
    try {
      const result = await updateTask(
        db as IDBDatabase,
        toRaw(reorderedTask) as Task,
      );
    } catch (err) {
      console.error(err);
    }
  }
};

export default updateTasksLoop;
