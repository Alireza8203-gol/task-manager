<template>
  <draggable
    item-key="id"
    v-bind="dragOptions"
    v-model="state.fetchedTasks"
    :group="{ name: 'tasks-group' }"
    class="grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 max-h-[585px] p-5 bg-stone-200 dark:bg-zinc-900 rounded-md overflow-scroll hide-scrollbar"
  >
    <!--:drag-end="dragEnd"-->
    <!--:endEventHandler="dragEnd"-->
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
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import type { State, Task } from "~/types/global";
import updateTask from "~/composables/updateTask";

const props = defineProps<{
  state: State;
  db: IDBDatabase | null;
  rerender: () => Promise<void>;
}>();

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

const putUpdatedTask = async (task: Task): Promise<void> => {
  try {
    await updateTask(props.db as IDBDatabase, task);
  } catch (err) {
    console.log(task);
    console.error(err);
  }
};
</script>
