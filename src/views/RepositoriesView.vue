<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRepositories } from '@/composables/useRepositories';

const { repositories, isLoading, error } = useRepositories();


</script>
<template>
  <div>
    <div v-if="isLoading">Loading repositories...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <ul v-else>
      <li v-for="repo in repositories" :key="repo.id">
        <RouterLink :to="{ name: 'Commits', params: { repo: repo.name, owner: repo.owner.login } }">
          View commits</RouterLink>
        <a :href="repo.html_url" target="_blank">open in new tab{{ repo.name }}</a>
        <p>{{ repo.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style></style>
