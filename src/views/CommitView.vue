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
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/16/solid';

const route = useRoute();
const repositoryStore = useRepositoryStore();
const commitStore = useCommitStore();

const searchParam = ref('');
const repository = computed(() => repositoryStore.selectedRepository);
const filteredCommits = computed(() => commitStore.filteredCommits);
const hasMore = computed(() => commitStore.hasMore);

watchEffect(() => {
  const repoName = route.params.repo as string;
  if (repoName) {
    commitStore.clearCommits();
    repositoryStore.setSelectedRepository(repoName);
  }
});

const handleSearch = (event: Event) => {
  searchParam.value = (event.target as HTMLInputElement).value;
  commitStore.getCommitsByQueryString(searchParam.value);
};


</script>
<template>
  <Header>{{ repository?.name.toUpperCase() }} Commits</Header>
  <p class="mb-4 text-sm italic">{{repository.description}}</p>
  <div class="flex items-center border-b-2 ">
    <MagnifyingGlassIcon class="size-6 mr-3 mb-3 text-purple-500"></MagnifyingGlassIcon>
    <Input placeholder="Search message" @input="handleSearch" class="mb-3" />
  </div>

  <InfiniteScrollWrapper :has-more="hasMore" @on-load-more="commitStore.loadMoreCommits">
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
        <TableRow v-for="(commit, idx) in filteredCommits" :key="commit.sha"
          :ref="idx === filteredCommits.length - 1 ? 'loadMore' : ''">
          <TableCell>
            #{{ commit.sha.substring(0, 7) }}
          </TableCell>
          <TableCell>
            {{ commit.commit.message }}
          </TableCell>
          <TableCell>
            {{ commit?.author?.login || 'unknown' }}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody v-else>
        <TableRow>
          <TableCell>No commits found</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </InfiniteScrollWrapper>
</template>
