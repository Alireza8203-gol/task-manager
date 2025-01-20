<template>
  <div
    :class="[
      'flex items-center justify-between gap-x-3 w-full p-5 rounded-md',
      { 'bg-zinc-700': !isDone, 'bg-zinc-800': isDone },
    ]"
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
          :checked="isChecked"
          @change="toggleStatus"
        />
        <Icon
          icon="heroicons-outline:check"
          class="opacity-0 text-white peer-checked:opacity-100"
        />
      </label>
      <span :class="['col-span-3 text-white', { done: isDone }]">
        {{ task.title }}
      </span>
    </div>
    <div class="flex items-center gap-x-3">
      <button
        type="button"
        :class="[
          'btn btn-md btn-square shadow-md-middle hover:shadow-amber-400',
          { 'btn-disabled': isDone },
        ]"
      >
        <Icon
          class="size-4 text-amber-400"
          icon="heroicons-outline:calendar-days"
        />
      </button>
      <button
        type="button"
        @click="removeTask"
        :class="[
          'btn btn-md btn-square shadow-md-middle hover:shadow-red-400',
          { '!bg-white/0': isDone },
        ]"
      >
        <Icon class="size-4 text-red-400" icon="heroicons-outline:trash" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import type { Task } from "~/types/global";

interface Props {
  task: Task;
  DB: IDBDatabase;
}

const emit = defineEmits<{
  (event: "updateTask", updatedTask: Task): void;
  (event: "rerenderTasks", rerenderTasks: boolean): void;
}>();
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
  DB: {
    required: true,
  },
}) as Props;

const isDone: Ref<boolean> = ref(props.task.status === "done");
const isChecked = computed<boolean>(() => props.task.status === "done");

const toggleStatus = (event: Event) => {
  emit("updateTask", {
    ...props.task,
    status: (event.target as HTMLInputElement).checked ? "done" : "pending",
  });
  isDone.value = !isDone.value;
};

const removeTask = async (): Promise<void> => {
  try {
    const res = await deleteTask(props.DB, props.task.id as number);
    console.log(res);
    emit("rerenderTasks", true);
  } catch (err) {
    console.error(err);
  }
};
</script>
