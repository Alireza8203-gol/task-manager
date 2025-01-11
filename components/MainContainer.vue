<template>
  <main class="flex items-center justify-center h-[100vh]">
    <div class="container">
      <div class="bg-zinc-700 rounded-lg p-4">
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
        <div class="flex items-center justify-between">
          <task-card />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import initDB from "~/composables/initDB.js";
import deleteDatabase from "~/composables/deleteDatabase.js";

const db = ref(null);
const state = reactive({
  taskData: {
    title: "",
    status: "pending",
    createdAt: "",
  },
});

const submitTask = async () => {
  const date = new Date();
  state.taskData.createdAt = `${date.getHours()}:${date.getMinutes()} - ${
    date.getMonth() + 1
  }/${date.getDay()}/${date.getFullYear()}`;

  try {
    state.taskData.title && (await addTask(db.value, state.taskData));
    state.taskData.title = "";
  } catch (error) {
    console.error(error);
  }
};

const submitDelete = () => {
  deleteDatabase();
};

onMounted(async () => {
  try {
    db.value = await initDB();
  } catch (e) {
    console.log(e);
  }
});
</script>
