<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/16/solid';
import { onMounted, ref, watch } from 'vue';
const wrapper = ref();
const emit = defineEmits(['onLoadMore']);
const loadMore = ref<HTMLDivElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)
const props = defineProps<{
  hasMore: boolean
}>();


onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        emit("onLoadMore")
      }
    })
  }, {rootMargin: "20px", threshold: 0.1 })

  if (loadMore.value) {
    observer.value.observe(loadMore.value)
  }

})

watch(() => props.hasMore, (newVal: boolean) => {
  if (observer.value && !newVal) {
    observer.value.disconnect();
  }
})

</script>


<template>
  <div ref="wrapper" class="h-full">
    <slot></slot>
    <div class="text-center" ref="loadMore">
      <span class="mx-auto inline-block">
        <SparklesIcon v-if="hasMore" class="size-4 text-purple-500 animate-pulse"></SparklesIcon>
      </span>
    </div>
  </div>

</template>
