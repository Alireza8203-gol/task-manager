<template>
  <h1 class="mb-4 text-3xl text-zinc-800 dark:text-white font-bold text-center">
    Task Manager
  </h1>
  <label
    for="taskTitle"
    class="block mb-2 text-lg font-semibold text-zinc-800 dark:text-white"
  >
    Task Title
  </label>
  <div class="mb-4 px-1">
    <div class="flex items-center justify-between w-full gap-4">
      <div class="flex-grow">
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          @keydown="sbmtTskByEnter"
          v-model="state.taskData.title"
          placeholder="Enter your task ..."
          class="w-full p-3 rounded-md border dark:border-zinc-700 bg-stone-200 dark:bg-zinc-600 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
        />
      </div>
      <div
        class="col-span-2 md:col-span-1 flex justify-end items-center gap-x-4"
      >
        <div class="relative group inline-block">
          <button
            @click="removeAllTasks"
            class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-red-400"
          >
            <Icon class="size-6 text-red-400" icon="heroicons-outline:trash" />
          </button>
          <div
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap opacity-0 transition-opacity duration-300 delay-1000 group-hover:opacity-100"
          >
            Remove All Tasks
          </div>
        </div>
        <button
          @click="submitTask"
          class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-green-400"
        >
          <Icon
            icon="heroicons-outline:plus"
            class="size-6 text-green-600 dark:text-green-400"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import addTask from "~/composables/addTask";
import type { State, Task } from "~/types/global";
import getAllTasks from "~/composables/getAllTasks";
import clearAllTasks from "~/composables/clearAllTasks";

const props = defineProps<{
  state: State;
  db: IDBDatabase | null;
  rerender: () => Promise<void>;
}>();

const submitTask = async (): Promise<void> => {
  const date: Date = new Date();
  props.state.taskData.createdAt = `${date.getHours()}:${date.getMinutes()} - ${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  props.state.taskData.id = crypto.randomUUID();
  props.state.taskData.order = props.state.fetchedTasks.length + 1;
  if (props.state.taskData.title && props.db) {
    try {
      props.state.taskData.title &&
        (await addTask(props.db, props.state.taskData));
      props.state.fetchedTasks = (await getAllTasks(props.db)) as Task[];
      props.state.taskData.title = "";
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Database hasn't been initialized", props.db);
  }
};

const sbmtTskByEnter = async (event: KeyboardEvent): Promise<void> => {
  if (event.key === "Enter") {
    try {
      await submitTask();
    } catch (err) {
      console.error(err);
    }
  }
};

const removeAllTasks = async (): Promise<void> => {
  try {
    const res = await clearAllTasks(props.db as IDBDatabase);
    await props.rerender();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
</script>
