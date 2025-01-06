<template>
  <div class="mb-4">
    <label
      :for="labelTitle"
      class="block mb-2 text-lg font-semibold text-white"
    >
      {{ labelTitle }}
    </label>
    <input
      :id="labelTitle"
      :name="labelTitle"
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="w-full p-3 rounded-md border border-zinc-700 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  labelTitle: {
    type: String,
    default: "Label Title",
    required: true,
  },
  inputType: {
    type: String,
    default: "text",
    required: true,
  },
  inputPlaceholder: {
    type: String,
    default: "Enter your task ...",
    required: false,
  },
});
</script>
