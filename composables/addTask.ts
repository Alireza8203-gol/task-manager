import { toRaw } from "vue";
import type { Task } from "~/types/global";

const addTask = async (db: IDBDatabase, task: Task): Promise<void> => {
  const transaction: IDBTransaction = db.transaction("Tasks", "readwrite");
  const tasks: IDBObjectStore = transaction.objectStore("Tasks");
  const plainTask: Task = {
    ...task, // Spread the reactive task data into a new plain object
    subTasks: toRaw(task.subTasks),
  };
  try {
    tasks.add(plainTask); // Add the task
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve(); // Resolve when the transaction completes
      transaction.onerror = () => reject(transaction.error); // Reject if there’s an error
    });
    console.log("Task saved");
  } catch (e) {
    console.log(plainTask);
    console.warn(
      "Failed to add task: " + (e instanceof Error ? e.message : String(e)),
    );
  }
};

export default addTask;
