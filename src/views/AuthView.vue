<script setup lang="ts">

import Avatar from '@/components/Avatar.vue';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/button/Button.vue';
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const { isAuthenticated, login, handleAuth, logout } = authStore;

onMounted(() => {
  const accessToken = route.query.token as string | undefined;
  if (accessToken) {
    handleAuth(accessToken);
  }


})

const user = computed(() => authStore.user);

</script>
<template>
  <div class="text-center w-full" v-if="!isAuthenticated">
    <h1 class="text-xl mb-2">Login</h1>

    <Button @click="login()">
      Login with GitHub
    </Button>
  </div>
  <div v-else>
    <Avatar :src="user?.avatar_url"></Avatar>
    <h1>User {{ user?.login }}</h1>
    <RouterLink to="/repositories">Go to my respositories</RouterLink>
    <Button @click="logout()">
      logout with GitHub
    </Button>
  </div>
</template>
