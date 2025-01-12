<template>
  <main class="flex items-center justify-center h-[100vh]">
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
        <div class="mb-4">
          <div
            class="grid grid-cols-5 items-center justify-between w-full gap-x-4"
          >
            <div class="col-span-4">
              <input
                id="taskTitle"
                name="taskTitle"
                type="text"
                placeholder="Enter your task ..."
                v-model="state.taskData.title"
                class="w-full p-3 rounded-md border border-zinc-700 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
              />
            </div>
            <div class="col-span-1 flex justify-end items-center gap-x-4">
              <CustomBtn @click="submitDelete" hover-effect-color="ruby">
                <Icon
                  icon="heroicons-outline:trash"
                  hover-effect-color="hover:shadow-ruby"
                  class="size-6 text-red-400"
                />
              </CustomBtn>
              <CustomBtn @click="submitTask" hover-effect-color="emerald">
                <Icon
                  icon="heroicons-outline:plus"
                  hover-effect-color="hover:shadow-emerald"
                  class="size-6 text-green-400"
                />
              </CustomBtn>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 p-5 bg-zinc-900 rounded-md"
        >
          <task-card
            v-for="task in state.fetchedTasks"
            :key="task.id"
            :task="task"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import initDB from "~/composables/initDB";
import deleteDatabase from "~/composables/deleteDatabase";
import getAllTasks from "~/composables/getAllTasks";

interface Task {
  id?: number;
  title: string;
  status: string;
  createdAt: string;
}

interface state {
  taskData: Task;
  loading?: boolean;
  fetchedTasks: [] | Task[];
}

const db = ref<IDBDatabase | null>(null);
const state: state = reactive({
  taskData: {
    title: "",
    status: "pending",
    createdAt: "",
  },
  fetchedTasks: [],
});

const submitTask = async (): void => {
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

onMounted(async (): void => {
  try {
    db.value = await initDB();
    state.fetchedTasks = (await getAllTasks(db.value)) as Task[];
    console.log(state.fetchedTasks);
  } catch (e) {
    console.log(e);
  }
});
</script>
