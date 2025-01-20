<template>
  <main
    class="bg-stone-200 dark:bg-zinc-900 flex items-center justify-center h-[100vh]"
  >
    <div class="container">
      <div class="bg-zinc-800 rounded-lg p-4">
        <!-- Title -->
        <h1 class="mb-4 text-3xl text-white font-bold text-center">
          Task Manager
        </h1>
        <label
          for="taskTitle"
          class="block mb-2 text-lg font-semibold text-white"
        >
          Task Title
        </label>
        <div class="mb-4 px-1">
          <div
            class="grid grid-cols-5 items-center justify-between w-full gap-x-4"
          >
            <div class="col-span-4">
              <input
                draggable="true"
                type="text"
                id="taskTitle"
                name="taskTitle"
                v-model="state.taskData.title"
                placeholder="Enter your task ..."
                class="w-full p-3 rounded-md border border-zinc-700 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
              />
            </div>
            <div class="col-span-1 flex justify-end items-center gap-x-4">
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
                  class="size-6 text-green-400"
                />
              </button>
            </div>
          </div>
        </div>
        <draggable
          item-key="id"
          v-bind="dragOptions"
          v-model="state.fetchedTasks"
          @end="dragEnd"
          class="grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 p-5 bg-zinc-900 rounded-md"
        >
          <template #item="{ element }">
            <task-card
              :DB="db"
              :task="element"
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
import initDB from "~/composables/initDB";
import type { Task } from "~/types/global";
import updateTask from "~/composables/updateTask";
import getAllTasks from "~/composables/getAllTasks";
import draggable from "vuedraggable/src/vuedraggable";
import deleteDatabase from "~/composables/deleteDatabase";

interface state {
  taskData: Task;
  loading?: boolean;
  fetchedTasks: Task[];
}

const db = ref<IDBDatabase | null>(null);
const state: state = reactive({
  taskData: {
    title: "",
    createdAt: "",
    status: "pending",
  },
  fetchedTasks: [],
});

const dragOptions = computed(() => ({
  animation: 200,
  disabled: false,
  ghostClass: "ghost",
  dragClass: "my-drag-class",
}));

const submitTask = async (): Promise<void> => {
  const date: Date = new Date();
  state.taskData.createdAt = `${date.getHours()}:${date.getMinutes()} - ${
    date.getMonth() + 1
  }/${date.getDay()}/${date.getFullYear()}`;
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

const submitDelete = (): void => {
  deleteDatabase();
};

const putUpdatedTask = async (task: Task): Promise<void> => {
  try {
    const result = await updateTask(db.value as IDBDatabase, task);
  } catch (err) {
    console.error(err);
  }
};

const rerender = async (rerenderTasks: boolean): Promise<void> => {
  try {
    state.fetchedTasks = (await getAllTasks(db.value)) as Task[];
  } catch (error) {
    console.error(error);
  }
};

const dragEnd = async () => {
  for (const task of state.fetchedTasks) {
    const copiedTask = { ...task };
    try {
      const result = await updateTask(
        db.value as IDBDatabase,
        copiedTask as Task,
      );
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
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

<style scoped>
.ghost {
  @apply opacity-0;
}
</style>
