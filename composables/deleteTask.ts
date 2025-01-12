import initDB from "./initDB.js";

const deleteTask = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.delete(id);

    request.onsuccess = () => resolve("Task deleted successfully");
    request.onerror = (event) =>
      reject(`Delete task failed: ${event.target.errorCode}`);
  });
};

export default deleteTask;
