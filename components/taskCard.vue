<template>
  <div class="flex items-center gap-x-3 w-full p-5 bg-zinc-600 rounded-md">
    <input
      :id="task.id"
      type="checkbox"
      name="task_done"
      v-model="props.task.status"
      class="peer hidden"
    />
    <label
      :for="task.id"
      class="size-5 rounded-sm bg-zinc-800 peer-checked:bg-amber-400 peer-checked:shadow-golden-outer transition"
    ></label>
    <span class="col-span-3 text-white">{{ task.title }}</span>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id?: number;
  title: string;
  status: string;
  createdAt: string;
}

interface Props {
  task: Task;
}

const props: Props = defineProps({
  task: {
    type: Object,
    required: true,
    default: {
      title: "Task Title",
      status: "pending",
      createdAt: "createdAt",
    },
  },
});
</script>
