<template>
  <div
    class="flex flex-col items-end gap-x-3 w-full rounded-md outline outline-1 outline-gray-200"
  >
    <div
      :class="[
        'flex items-center justify-between gap-x-3 w-full p-5 rounded-md',
        {
          'bg-stone-300 dark:bg-zinc-700': !isDone,
          'bg-stone-300/50 dark:bg-zinc-800': isDone,
        },
      ]"
    >
      <div class="flex items-center gap-x-3">
        <label
          :for="task.id"
          class="flex items-center justify-center size-5 rounded-sm bg-zinc-500 dark:bg-zinc-800 shadow-sm-middle dark:shadow-lg-middle dark:hover:shadow-amber-400 hover:cursor-pointer transition"
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
            class="opacity-0 peer-checked:opacity-100 peer-checked:text-white"
          />
        </label>
        <span
          :class="[
            'col-span-3 text-zinc-800 dark:text-white line-clamp-1',
            { done: isDone },
          ]"
        >
          {{ task.title }}
        </span>
      </div>
      <div class="flex items-center gap-x-3">
        <button
          type="button"
          :class="[
            'btn btn-md btn-square shadow-sm-middle dark:shadow-md-middle hover:shadow-zinc-900 dark:hover:shadow-amber-400',
            { 'btn-disabled': isDone },
          ]"
        >
          <Icon
            icon="heroicons-outline:calendar-days"
            class="size-4 text-amber-600 dark:text-amber-400"
          />
        </button>
        <button
          type="button"
          @click="removeTask"
          :class="[
            'btn btn-md btn-square shadow-sm-middle dark:shadow-md-middle hover:shadow-zinc-900 dark:hover:shadow-red-400',
            { '!bg-white/0': isDone },
          ]"
        >
          <Icon class="size-4 text-red-400" icon="heroicons-outline:trash" />
        </button>
      </div>
    </div>
    <!-- @end="dragEnd" -->
    <draggable
      item-key="id"
      v-bind="dragOptions"
      v-model="task.subTasks"
      @change="onChangeHandler"
      :group="{ name: 'tasks-group' }"
      :class="[
        'grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 max-h-[585px] w-full  bg-stone-200 dark:bg-zinc-900 rounded-md overflow-scroll hide-scrollbar',
        { 'pt-3 pl-5': task.subTasks.length > 0 },
      ]"
    >
      <template #item="{ element }">
        <task-card :DB="props.DB" :task="element" />
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import draggable from "vuedraggable";
import type { Task } from "~/types/global";
import deleteTask from "~/composables/deleteTask";
import changeEventHandler from "~/composables/changeEventHandler";

interface Props {
  task: Task;
  DB: IDBDatabase;
  dragOptions: Object;
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
  dragOptions: {
    type: Object,
    required: false,
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
    const res = await deleteTask(props.DB, props.task.order as number);
    console.log(res);
    emit("rerenderTasks", true);
  } catch (err) {
    console.error(err);
  }
};

// todo: need to add the sub-task's data to the subtasks array of the task prop and then pass is up to the parent to reorder and update all the other tasks.
// todo: the tasks gets pushed over and over again in an endless loop. need to stop is somehow :/
const onChangeHandler = (event: Event) => {
  //   props.task.subTasks?.push(subTaskData);
  changeEventHandler({
    event: event,
    dataBase: props.DB,
    tasksArray: props.task,
    parentTask: props.task,
  });
};
</script>
