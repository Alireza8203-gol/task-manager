const deleteTask = async (db: IDBDatabase, id: number | string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Tasks", "readwrite");
    const store = transaction.objectStore("Tasks");
    const request = store.delete(id);

    request.onsuccess = () => resolve("Task deleted successfully");
    request.onerror = (event) =>
      reject(`Delete task failed: ${(event.target as IDBRequest).error}`);
  });
};

export default deleteTask;
