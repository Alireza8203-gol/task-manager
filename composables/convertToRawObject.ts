import { toRaw } from "vue";
import type { Task } from "~/types/global";

const convertToRawObject = (proxyObj: any): any => {
  if (!proxyObj) return proxyObj;

  // Convert the proxy object to raw
  const rawObj = toRaw(proxyObj);

  // Check if `subTasks` exists and is an array, then recursively convert its items
  if (Array.isArray(rawObj.subTasks)) {
    rawObj.subTasks = rawObj.subTasks.map((task: Task) =>
      convertToRawObject(task),
    );
  }

  return rawObj;
};

export default convertToRawObject;
