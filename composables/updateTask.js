import initDB from "./initDB";

const updateTask = async (task) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.put(task);

    request.onsuccess = () => resolve("Task updated successfully");
    request.onerror = (event) =>
      reject(`Update task failed: ${event.target.errorCode}`);
  });
};

export default updateTask;
