const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("taskManager");

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("Tasks")) {
        db.createObjectStore("Tasks", { keyPath: "id", autoIncrement: true });
      }
    };

    openRequest.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result); // Resolve with the database instance
    };

    openRequest.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error); // Reject with the error
    };
  });
};

export default initDB;
