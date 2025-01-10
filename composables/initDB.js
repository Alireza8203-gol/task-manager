const initDB = () => {
  const dbName = "TaskManagerDB";
  const storeName = "tasks";

  const request = indexedDB.open("taskManager", 1);

  request.onerror = function () {
    console.error("Error", request.error);
  };
  request.onsuccess = function () {
    console.log("Success", request.result);
  };
};

export default initDB;
