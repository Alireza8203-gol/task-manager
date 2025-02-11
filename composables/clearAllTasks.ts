const clearAllTasks = (DB: IDBDatabase) => {
  return new Promise((resolve, reject) => {
    const transaction: IDBTransaction = DB.transaction("Tasks", "readwrite");
    const objectStore: IDBObjectStore = transaction.objectStore("Tasks");

    const clearRequest: IDBRequest = objectStore.clear();

    clearRequest.onsuccess = () =>
      resolve("Tasks object store cleared successfully!");
    clearRequest.onerror = () => reject(clearRequest.error);
  });
};

export default clearAllTasks;
