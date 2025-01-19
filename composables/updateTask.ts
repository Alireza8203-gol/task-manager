import type { Task } from "~/types/global";

const updateTask = async (db: IDBDatabase, task: Task): Promise<unknown> => {
  const transaction: IDBTransaction = db.transaction("Tasks", "readwrite");
  const store: IDBObjectStore = transaction.objectStore("Tasks");
  const request: IDBRequest<IDBValidKey> = store.put(task);

  return new Promise((resolve, reject): void => {
    request.onsuccess = () => resolve("Task updated successfully");
    request.onerror = (event: Event) =>
      reject(`Update task failed: ${(event.target as IDBRequest).error}`);
  });
};

export default updateTask;
