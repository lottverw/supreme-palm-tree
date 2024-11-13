<script setup lang="ts">
import Header from '@/components/Header.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRepositoryStore } from '@/stores/repositoryStore';
import { computed } from 'vue';

const { isLoading, error } = useRepositoryStore();
const repositories = computed(() => useRepositoryStore().repositories)

</script>
<template>
  <div>
    <Header>Repositories</Header>
    <div v-if="isLoading">Loading repositories...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <Table v-else-if="repositories.length > 0">
      <TableCaption>Public repositories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Description
          </TableHead>
          <TableHead>
            Commits
          </TableHead>
          <TableHead>
            Language
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="repo in repositories" :key="repo.id">
          <TableCell>
            {{ repo.name }}
          </TableCell>
          <TableCell>
            {{ repo.description || "No description" }}
          </TableCell>
          <TableCell class="underline text-purple-500">
            <RouterLink :to="{ name: 'Commits', params: { repo: repo.name } }">
              View commits</RouterLink>
          </TableCell>
          <TableCell>
            {{ repo.language }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div v-else><p>No repositories found.</p></div>
  </div>
</template>
