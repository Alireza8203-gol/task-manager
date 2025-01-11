const addTask = async (db, task) => {
  const transaction = db.transaction("Tasks", "readwrite");
  const tasks = transaction.objectStore("Tasks");
  const plainTask = {
    ...task, // Spread the reactive task data into a new plain object
  };
  try {
    tasks.add(plainTask); // Add the task
    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(); // Resolve when the transaction completes
      transaction.onerror = () => reject(transaction.error); // Reject if there’s an error
    });
    console.log("Task saved");
  } catch (e) {
    console.log("Failed to add task: " + e);
  }
};

export default addTask;
