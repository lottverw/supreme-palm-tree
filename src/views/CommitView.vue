<script setup lang="ts">
import { useCommitStore } from '@/stores/commitStore';
import { useRepositoryStore } from '@/stores/repositoryStore';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
const route = useRoute();
const repositoryStore = useRepositoryStore();
const commitStore = useCommitStore();

const searchParam = ref('');
const repository = computed(() => repositoryStore.selectedRepository);
const commits = computed(() => commitStore.filteredCommits)

watchEffect(() => {
  const repoName = route.params.repo as string;
  if (repoName) {
    repositoryStore.setSelectedRepository(repoName); // Stel de repository in bij verandering
  }
});

const handleSearch = () => {
  commitStore.getCommitsByQueryString(searchParam.value);
};
</script>


<template>
  <h1 class="text-xl mb-4">Commits for repostory: {{ repository?.name }}</h1>
  <Input placeholder="Search message" @input="handleSearch" v-model="searchParam" class="mb-3" />
  <Table>
    <TableCaption v-if="searchParam">Only commits that match {{ searchParam }} are begin shown</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>
          SHA
        </TableHead>
        <TableHead>
          Message
        </TableHead>
        <TableHead>
          Committer
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody v-if="commits.length > 0">
      <TableRow v-for="commit in commits" :key="commit.sha">
        <TableCell>
          #{{ commit.sha.substring(0, 5) }}
        </TableCell>
        <TableCell>
          {{ commit.commit.message }}
        </TableCell>
        <TableCell>
          {{ commit.author.login }}
        </TableCell>
      </TableRow>
    </TableBody>
    <TableBody v-else>
      <TableRow>
        <TableCell>No commits found</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
