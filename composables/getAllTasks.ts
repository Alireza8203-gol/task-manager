import type { Task } from "~/types/global";

const getAllTasks = async (db: IDBDatabase): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction("Tasks", "readonly");
    const store: IDBObjectStore = transaction.objectStore("Tasks");
    const request: IDBRequest<Task[]> = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => {
      reject(`Get tasks failed: ${(event.target as IDBRequest).error}`);
    };
  });
};

export default getAllTasks;
