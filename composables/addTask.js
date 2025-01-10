import initDB from "./initDB";

const addTask = async (task) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.add(task);

    request.onsuccess = () => resolve("Task added successfully");
    request.onerror = (event) =>
      reject(`Add task failed: ${event.target.errorCode}`);
  });
};

export default addTask;
