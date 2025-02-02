import { toRaw } from "vue";
import type { passedArguments, Task } from "~/types/global";
import deleteTask from "~/composables/deleteTask";

const mainTaskHandler = async (argObj: passedArguments): Promise<void> => {
  const eventType = Object.keys(argObj.event)[0];
  switch (eventType) {
    case "moved":
      // console.log(argObj.event);
      // const containerTask;

      break;
    case "removed":
      // console.log("mainTask removed event triggered");
      const removedTask = toRaw(argObj.event.removed.element) as Task;
      // console.log(removedTask);
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
      // const rawParentTask = convertToRawObject(argObj.parentTask);
      // console.log(rawParentTask);
      // try {
      //   await updateTask(argObj.dataBase, rawParentTask);
      // } catch (err) {
      //   console.error(
      //     "added event triggered but adding task to database failed ",
      //     err,
      //   );
      // }
      break;
  }
};
export default mainTaskHandler;
