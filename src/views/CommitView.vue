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
import Header from '@/components/Header.vue';
const route = useRoute();
const repositoryStore = useRepositoryStore();
const commitStore = useCommitStore();

const searchParam = ref('');
const repository = computed(() => repositoryStore.selectedRepository);
const filteredCommits = computed(() => commitStore.filteredCommits);
const { isLoading } = commitStore;

watchEffect(() => {
  const repoName = route.params.repo as string;
  if (repoName) {
    repositoryStore.setSelectedRepository(repoName);
  }
});

const handleSearch = () => {
  commitStore.getCommitsByQueryString(searchParam.value);
};
</script>


<template>
  <Header>Commits for repostory: {{ repository?.name }}</Header>
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
    <TableBody v-if="filteredCommits">
      <TableRow v-for="(commit , key) in filteredCommits" :key="commit.sha">
        <TableCell>
          {{ key  }}
          #{{ commit.sha.substring(0, 5) }}
        </TableCell>
        <TableCell>
          {{ commit.commit.message }}
        </TableCell>
        <TableCell>
          {{ commit?.author.login || 'unknown' }}
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
