<script setup lang="ts">

import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/button/Button.vue';
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Header from '@/components/Header.vue';

const route = useRoute();
const authStore = useAuthStore();
const { isAuthenticated, login, handleAuth } = authStore;

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
    <Header>Login</Header>
    <Button @click="login()">
      Login with GitHub
    </Button>
  </div>
  <div v-else>
    <Header>Welcome {{ user?.login }}</Header>
    <p>Check out your repositories here <RouterLink class="underline text-blue-500 hover:text-blue-600" to="/repositories">Repositories</RouterLink></p>
</div>
</template>
