<script setup lang="ts">
const props = defineProps(['src'])
</script>
<template>
  <img class="rounded-full w-16 h-16" :src="props.src" />
</template>
