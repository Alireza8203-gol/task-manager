// interface Task {
//   id?: number;
//   title: string;
//   status: string;
// }

const addTask = async (db: IDBDatabase, task: Task) => {
  const transaction = db.transaction("Tasks", "readwrite");
  const tasks = transaction.objectStore("Tasks");
  const plainTask: Task = {
    ...task, // Spread the reactive task data into a new plain object
  };
  try {
    tasks.add(plainTask); // Add the task
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve(); // Resolve when the transaction completes
      transaction.onerror = () => reject(transaction.error); // Reject if there’s an error
    });
    console.log("Task saved");
  } catch (e) {
    console.log(
      "Failed to add task: " + (e instanceof Error ? e.message : String(e)),
    );
  }
};

export default addTask;
