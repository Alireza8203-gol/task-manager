const initDB = () => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("taskManager");

    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("Tasks")) {
        db.createObjectStore("Tasks", { keyPath: "id", autoIncrement: true });
      }
    };

    openRequest.onsuccess = (event) => {
      resolve(event.target.result); // Resolve with the database instance
    };

    openRequest.onerror = (event) => {
      reject(event.target.error); // Reject with the error
    };
  });
};

export default initDB;
