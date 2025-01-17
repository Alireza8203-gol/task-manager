// interface Task {
//   id?: number;
//   title: string;
//   status: string;
// }

const updateTask = async (db: IDBDatabase, task: Task) => {
  const transaction = db.transaction("tasks", "readwrite");
  const store = transaction.objectStore("tasks");
  const request = store.put(task);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve("Task updated successfully");
    request.onerror = (event: Event) =>
      reject(`Update task failed: ${(event.target as IDBRequest).error}`);
  });
};

export default updateTask;
