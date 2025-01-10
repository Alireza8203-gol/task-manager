import initDB from "./initDB";

const getTasks = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) =>
      reject(`Get tasks failed: ${event.target.errorCode}`);
  });
};

export default getTasks;
