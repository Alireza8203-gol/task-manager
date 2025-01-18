<template>
  <div
    class="flex items-center justify-between gap-x-3 w-full p-5 bg-zinc-700 rounded-md"
  >
    <div class="flex items-center gap-x-3">
      <label
        :for="task.id"
        class="flex items-center justify-center size-5 rounded-sm bg-zinc-800 peer-checked:bg-amber-400 shadow-lg-middle hover:shadow-amber-400 hover:cursor-pointer transition"
      >
        <input
          :id="task.id"
          type="checkbox"
          name="task_done"
          class="peer hidden"
          v-model="props.task.status"
        />
        <Icon
          icon="heroicons-outline:check"
          class="opacity-0 text-white peer-checked:opacity-100"
        />
      </label>
      <span class="col-span-3 text-white peer-checked:line-through">
        {{ task.title }}
      </span>
    </div>
    <div class="flex items-center gap-x-3">
      <button
        type="button"
        class="btn btn-md btn-square shadow-md-middle hover:shadow-amber-400"
      >
        <Icon
          class="size-4 text-amber-400"
          icon="heroicons-outline:calendar-days"
          hover-effect-color="hover:shadow-emerald"
        />
      </button>
      <button
        type="button"
        class="btn btn-md btn-square shadow-md-middle hover:shadow-red-400"
      >
        <Icon
          class="size-4 text-red-400"
          icon="heroicons-outline:trash"
          hover-effect-color="hover:shadow-emerald"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Task } from "~/types/global";

interface Props {
  task: Task;
}

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: {
      title: "Task Title",
      status: "pending",
      createdAt: "createdAt",
    },
  },
}) as Props;
</script>
