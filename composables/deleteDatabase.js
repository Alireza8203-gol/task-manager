const deleteDatabase = () => {
  const request = indexedDB.deleteDatabase("taskManager");
};

export default deleteDatabase;
