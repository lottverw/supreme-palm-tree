<script setup lang="ts">
import { useCommits } from '@/composables/useCommits';
import { useRepositoryStore } from '@/stores/repositoryStore';
import { useRoute } from 'vue-router';
const route = useRoute();
const repositoryStore = useRepositoryStore();
const repository = repositoryStore.getRepoByName(route.params.repo as string);

const { commits } = useCommits(repository?.owner.login as string, route.params.repo as string)
</script>


<template>
  <h1 class="text-xl">Commits for repostory: {{ repository?.name }}</h1>
  <ul v-for="commit in commits" :key="commit.sha">
    <li>{{ commit.sha }}</li>
  </ul>

</template>
