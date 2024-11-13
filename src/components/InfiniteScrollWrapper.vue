<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/16/solid';
import { SparklesIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['onLoadMore']);
const loadMore = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  hasMore: boolean
}>();


onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        emit("onLoadMore")
      }
    })
  },  { threshold: 0.1 })

  if (loadMore.value) {
    observer.observe(loadMore.value)
  }

  if (!props.hasMore) {
    observer.disconnect();
  }

})

</script>


<template>
  <slot></slot>
  <div class="text-center" ref="loadMore" v-if="hasMore">
    <span class="mx-auto inline-block">

      <SparklesIcon class="size-3 text-purple-500 animate-pulse"></SparklesIcon>
    </span>
  </div>
</template>
