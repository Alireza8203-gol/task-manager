<template>
  <header>
    <nav
        class="flex justify-between items-center gap-x-4 w-full p-4 absolute top-0"
    >
      <CustomBtn>
        <Icon icon="heroicons-outline:bars-3" class="size-6 text-white"/>
      </CustomBtn>
      <div class="flex items-center gap-x-4">
        <CustomBtn>
          <Icon icon="heroicons-outline:user" class="size-6 text-white"/>
        </CustomBtn>
        <CustomBtn>
          <Icon icon="heroicons-outline:moon" class="size-6 text-white"/>
        </CustomBtn>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {Icon} from "@iconify/vue";
</script>
