<template>
  <main
    class="bg-stone-200 dark:bg-zinc-900 flex items-center justify-center h-[80vh]"
  >
    <div class="container">
      <div class="bg-stone-300 dark:bg-zinc-800 rounded-lg p-4 shadow-xl">
        <!-- Title -->
        <TitleBar :state="state" :db="db" :rerender="rerender" />
        <!--@end="dragEnd"-->
        <!--@change="onChangeHandler"-->
        <!--        <draggable-->
        <!--          item-key="id"-->
        <!--          v-bind="dragOptions"-->
        <!--          v-model="state.fetchedTasks"-->
        <!--          :group="{ name: 'tasks-group' }"-->
        <!--          class="grid grid-cols-1 items-center gap-y-5 justify-between gap-x-3 max-h-[585px] p-5 bg-stone-200 dark:bg-zinc-900 rounded-md overflow-scroll hide-scrollbar"-->
        <!--        >-->
        <!--          &lt;!&ndash;:drag-end="dragEnd"&ndash;&gt;-->
        <!--          &lt;!&ndash;:endEventHandler="dragEnd"&ndash;&gt;-->
        <!--          <template #item="{ element }">-->
        <!--            <task-card-->
        <!--              :DB="db"-->
        <!--              :task="element"-->
        <!--              :dragOptions="dragOptions"-->
        <!--              @rerender-tasks="rerender"-->
        <!--              @update-task="putUpdatedTask"-->
        <!--            />-->
        <!--          </template>-->
        <!--        </draggable>-->
        <TasksList :state="state" :db="db" :rerender="rerender" />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import initDB from "~/composables/initDB";
import type { State, Task } from "~/types/global";
import getAllTasks from "~/composables/getAllTasks";
import reorderTasks from "~/composables/reorderTasks";
import TasksList from "~/components/TasksList.vue";

const db = ref<IDBDatabase | null>(null);
const state: State = reactive({
  taskData: {
    id: "",
    title: "",
    createdAt: "",
    status: "pending",
  },
  fetchedTasks: [],
});

const rerender = async (): Promise<void> => {
  try {
    state.fetchedTasks = (await getAllTasks(db.value as IDBDatabase)) as Task[];
  } catch (error) {
    console.error(error);
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

watch(
  () => state.fetchedTasks,
  async () => {
    await reorderTasks(db.value as IDBDatabase, state.fetchedTasks);
    console.log("tasks submitted to db");
  },
);
</script>

<style scoped></style>
