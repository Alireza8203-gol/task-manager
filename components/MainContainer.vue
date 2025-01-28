<template>
  <main
    class="bg-stone-200 dark:bg-zinc-900 flex items-center justify-center h-[80vh]"
  >
    <div class="container">
      <div class="bg-stone-300 dark:bg-zinc-800 rounded-lg p-4 shadow-xl">
        <!-- Title -->
        <h1
          class="mb-4 text-3xl text-zinc-800 dark:text-white font-bold text-center"
        >
          Task Manager
        </h1>
        <label
          for="taskTitle"
          class="block mb-2 text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Task Title
        </label>
        <div class="mb-4 px-1">
          <div
            class="grid grid-cols-7 md:grid-cols-5 items-center justify-between w-full gap-4"
          >
            <div class="col-span-5 md:col-span-4">
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
              <button
                @click="submitDelete"
                class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-red-400"
              >
                <Icon
                  class="size-6 text-red-400"
                  icon="heroicons-outline:trash"
                />
              </button>
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
        <!-- @end="dragEnd" -->
        <draggable
          item-key="id"
          v-bind="dragOptions"
          @change="onChangeHandler"
          v-model="state.fetchedTasks"
          :group="{ name: 'tasks-group' }"
          class="grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 max-h-[585px] p-5 bg-stone-200 dark:bg-zinc-900 rounded-md overflow-scroll hide-scrollbar"
        >
          <template #item="{ element }">
            <task-card
              :DB="db"
              :task="element"
              :dragOptions="dragOptions"
              @rerender-tasks="rerender"
              @update-task="putUpdatedTask"
            />
          </template>
        </draggable>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import draggable from "vuedraggable";
import initDB from "~/composables/initDB";
import addTask from "~/composables/addTask";
import type { state, Task } from "~/types/global";
import updateTask from "~/composables/updateTask";
import getAllTasks from "~/composables/getAllTasks";
import deleteDatabase from "~/composables/deleteDatabase";
import changeEventHandler from "~/composables/changeEventHandler";

const db = ref<IDBDatabase | null>(null);
const state: state = reactive({
  taskData: {
    id: "",
    title: "",
    subTasks: [],
    createdAt: "",
    status: "pending",
  },
  fetchedTasks: [],
});

const dragOptions = computed(() => ({
  delay: 200,
  animation: 200,
  disabled: false,
  ghostClass: "ghost",
  nestedDraggable: true,
  delayOnTouchOnly: true,
  dragClass: "my-drag-class",
  nestedClass: "my-nested-class",
}));

const submitTask = async (): Promise<void> => {
  const date: Date = new Date();
  state.taskData.createdAt = `${date.getHours()}:${date.getMinutes()} - ${
    date.getMonth() + 1
  }/${date.getDay()}/${date.getFullYear()}`;
  state.taskData.id = crypto.randomUUID();
  state.taskData.order = state.fetchedTasks.length + 1;
  if (state.taskData.title && db.value) {
    try {
      state.taskData.title && (await addTask(db.value, state.taskData));
      state.fetchedTasks = (await getAllTasks(db.value)) as Task[];
      state.taskData.title = "";
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Database hasn't been initialized", db.value);
  }
};
const sbmtTskByEnter = async (event: Event): Promise<void> => {
  if (event.key === "Enter") {
    try {
      await submitTask();
    } catch (err) {
      console.error(err);
    }
  }
};
const submitDelete = (): void => {
  deleteDatabase();
};
const putUpdatedTask = async (task: Task): Promise<void> => {
  try {
    await updateTask(db.value as IDBDatabase, task);
  } catch (err) {
    console.error(err);
  }
};
const rerender = async (): Promise<void> => {
  try {
    state.fetchedTasks = (await getAllTasks(db.value as IDBDatabase)) as Task[];
  } catch (error) {
    console.error(error);
  }
};
const onChangeHandler = async (event: Event) => {
  await changeEventHandler({
    event: event,
    tasksArray: state.fetchedTasks,
    dataBase: db.value as IDBDatabase,
  });
};

onMounted(async (): Promise<void> => {
  try {
    db.value = await initDB();
    state.fetchedTasks = (await getAllTasks(db.value)) as Task[];
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped></style>
