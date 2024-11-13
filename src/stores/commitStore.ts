import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { CommitService } from "@/services/CommitService";
import { useRepositoryStore } from "./repositoryStore";

export const useCommitStore = defineStore('useCommitStore', () => {

  const { isAuthenticated } = useAuthStore();
  const commits = ref<Commit[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const filteredCommits = ref<Commit[]>([]);
  const selectedRepository = computed(() => useRepositoryStore().selectedRepository);
  const perPage = 20;
  const page = ref<number>(0);
  const hasMore = ref(false);

  const { isLoading: queryLoading, error: queryError, isFetchingNextPage } = useQuery({
    queryKey: ["commits", selectedRepository, page],
    queryFn: () => {
      if (!selectedRepository.value) {
        return;
      }

      return CommitService.getCommits(selectedRepository.value, perPage, page.value)
    },
    enabled: isAuthenticated,
    onSuccess: (data: Commit[]) => {
      hasMore.value = data.length > 0 && data.length === perPage;
      commits.value = [...commits.value, ...data];
      filteredCommits.value = [
        ...filteredCommits.value,
        ...data.reduce((acc, commit) => {
          // Check if the commit with the same 'sha' already exists in the accumulator
          if (!acc.some(existingCommit => existingCommit.sha === commit.sha)) {
            acc.push(commit); // Add the commit if it's unique
          }
          return acc;
        }, [] as typeof data)
      ];

    },
    refetchOnWindowFocus: false,
    retry: true
  })

  isLoading.value = queryLoading;
  error.value = queryError;


  const getCommitsByQueryString = (queryString: string) => {
    if (queryString.length === 0) {
      filteredCommits.value = [...commits.value];
      return;
    }

    filteredCommits.value = CommitService.findByQueryString(commits.value, queryString)
  }

  const loadMoreCommits = () => {
    if (isFetchingNextPage) return;
    page.value += 1;
  }

  const clearCommits = () => {
    commits.value = [];
    filteredCommits.value = [];
  }
  return {
    commits,
    isLoading,
    error,
    getCommitsByQueryString,
    filteredCommits,
    loadMoreCommits,
    hasMore,
    clearCommits
  };
})
