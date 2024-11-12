<script setup lang="ts">
import type { GithubUser } from '@/types/Auth';
import Avatar from './Avatar.vue';
import Button from '@/components/ui/button/Button.vue';
import { useAuthStore } from '@/stores/authStore';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/16/solid';

defineProps<{
  githubUser: GithubUser
}>();

const authStore = useAuthStore();
const { logout } = authStore;

</script>


<template>
  <aside class="col-span-3 bg-purple-50 h-full py-16 text-center">
    <Avatar class="mx-auto mb-3" v-if="githubUser" :src="githubUser?.avatar_url"></Avatar>
    <h1 class=" text-xl">{{ githubUser.login }}</h1>
    <div class="mb-5">
      <a target="_blank" :href="githubUser.html_url">View on Github <ArrowTopRightOnSquareIcon class="size-3 inline" /> </a>
    </div>
    <Button @click="logout()">
      Log out
    </Button>
  </aside>
</template>
