import { toRaw } from "vue";
import type { passedArguments, Task } from "~/types/global";
import updateTask from "~/composables/updateTask";
import deleteTask from "~/composables/deleteTask";

const changeEventHandler = async (argObj: passedArguments): Promise<void> => {
  const eventType = Object.keys(argObj.event)[0];
  switch (eventType) {
    case "moved":
      // console.log(argObj.event);
      for (let i: number = 0; i < argObj.tasksArray.length; i++) {
        const task: Task = argObj.tasksArray[i];
        const reorderedTask = {
          ...task,
          order: i + 1,
          subTasks: toRaw(task.subTasks),
        };
        try {
          const result = await updateTask(
            argObj.dataBase,
            toRaw(reorderedTask) as Task,
          );
          console.log(result);
        } catch (err) {
          console.error(err);
        }
      }
      break;
    case "removed":
      // console.log("event type is removed");
      const removedTask = toRaw(argObj.event.removed.element) as Task;
      console.log(removedTask);
      try {
        await deleteTask(argObj.dataBase, removedTask.order as number | string);
      } catch (err) {
        console.error(
          "removed event triggered but removing task from database failed ",
          err,
        );
      }
      break;
    case "added":
      // console.log("event type is added");

      try {
        await updateTask(argObj.dataBase, rawParentTask);
      } catch (err) {
        console.error(
          "added event triggered but adding task to database failed ",
          err,
        );
      }
      break;
  }
};
export default changeEventHandler;
