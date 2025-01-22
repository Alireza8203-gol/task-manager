<template>
  <header>
    <nav
      class="flex justify-between items-center gap-x-4 w-full p-4 mb-4 md:mb-0"
    >
      <button
        class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-zinc-900 dark:hover:shadow-amber-400"
      >
        <Icon
          icon="heroicons-outline:bars-3"
          class="size-6 text-zinc-900 dark:text-white"
        />
      </button>
      <div class="flex items-center gap-x-4">
        <button
          class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-zinc-900 dark:hover:shadow-amber-400"
        >
          <Icon
            icon="heroicons-outline:user"
            class="size-6 text-zinc-900 dark:text-white"
          />
        </button>
        <button
          class="btn btn-circle btn-lg shadow-3xl-inner hover:shadow-zinc-900 dark:hover:shadow-amber-400"
          @click="toggleTheme"
        >
          <Icon
            icon="heroicons-outline:moon"
            class="size-6 text-zinc-900 dark:text-white"
          />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const colorMode = useColorMode();
const toggleTheme = (): void => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
  console.log(colorMode.preference);
};
</script>
