<template>
  <button
      :class="[
      'flex items-center justify-center bg-white/20 backdrop-blur-lg border border-white/30 text-white p-4 rounded-full shadow transition hover:scale-120',
      dynamicClass,
    ]"
  >
    <slot/>
  </button>
</template>

<script setup>
const props = defineProps({
  hoverEffectColor: {
    type: String,
    required: false,
    default: "golden",
  },
});

const dynamicClass = computed(() => {
  switch (props.hoverEffectColor) {
    case 'emerald':
      return 'hover:shadow-emerald';
    case 'ruby':
      return 'hover:shadow-ruby';
    default:
      return 'hover:shadow-golden';
  }
});
</script>
