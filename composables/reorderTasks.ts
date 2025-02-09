import { toRaw } from "vue";
import type { Task } from "~/types/global";

const reorderTasks = (taskObject: Task) => {
  if (!taskObject) return taskObject;

  const rawObj = toRaw(taskObject);
  if (Array.isArray(rawObj.subTasks)) {
    rawObj.subTasks = rawObj.subTasks.map((task: Task, index: number) => {
      return {
        ...task,
        order: index + 1,
      };
    });
    return rawObj;
  }
};
export default reorderTasks;
