<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
import { useAuthStore } from './stores/authStore';
import { computed } from 'vue';
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user)

console.log(isAuthenticated, user)

</script>

<template>
  <div class="grid grid-cols-12 min-h-screen">
    <Sidebar v-if="isAuthenticated && user" :github-user="user"></Sidebar>
    <main :class="{'col-span-9': isAuthenticated, 'col-span-12': !isAuthenticated}" class="p-16 overflow-y-auto">
      <RouterView />
    </main>

  </div>

</template>
