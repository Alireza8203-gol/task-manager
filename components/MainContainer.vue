<template>
  <main class="flex items-center justify-center h-[100vh]">
    <div class="container">
      <div class="bg-zinc-700 rounded-lg p-4">
        <!-- Title -->
        <h1 class="mb-4 text-3xl text-white font-bold text-center">
          Task Manager
        </h1>

        <div
          class="grid grid-cols-4 items-center justify-between w-full gap-x-4"
        >
          <div class="col-span-3">
            <FormInput
              label-title="Task Title"
              input-type="text"
              input-placeholder="Enter your task ..."
            />
          </div>

          <div class="col-span-1 flex justify-center items-center gap-x-4">
            <Button>
              <Icon
                icon="heroicons-outline:trash"
                class="size-6 text-red-400"
              />
            </Button>
            <Button>
              <Icon
                icon="heroicons-outline:plus"
                class="size-6 text-green-400"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
