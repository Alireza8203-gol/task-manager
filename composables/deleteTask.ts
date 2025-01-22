const deleteTask = async (db: IDBDatabase, order: number | string) => {
  return new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction("Tasks", "readwrite");
    const store: IDBObjectStore = transaction.objectStore("Tasks");
    const request: IDBRequest<undefined> = store.delete(order);

    request.onsuccess = () => resolve("Task deleted successfully");
    request.onerror = (event) =>
      reject(`Delete task failed: ${(event.target as IDBRequest).error}`);
  });
};

export default deleteTask;
