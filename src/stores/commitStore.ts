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
  const page = ref<number>(1);
  const hasMore = ref(true);

  const { data, isLoading: queryLoading, error: queryError, isFetchingNextPage } = useQuery({
    queryKey: ["commits", selectedRepository, page],
    queryFn: () => {
      if (!selectedRepository.value) {
        return;
      }

      if(!hasMore.value) {
        return
      }
      return CommitService.getCommits(selectedRepository.value, perPage, page.value)
    },
    enabled: isAuthenticated,
    onSuccess: (data: Commit[]) => {
      hasMore.value = data.length > 0 && data.length === perPage;
      commits.value = [...commits.value, ...data];
      filteredCommits.value = [...commits.value, ...data];
    },
    refetchOnWindowFocus: false,
    retry: false
  })

  isLoading.value = queryLoading;
  error.value = queryError;


  const getCommitsByQueryString = (queryString: string) => {
    if (queryString.length === 0) {
      filteredCommits.value = commits.value;
      return;
    }

    filteredCommits.value = CommitService.findByQueryString(commits.value, queryString)
  }

  const loadMoreCommits = () => {
    if (isFetchingNextPage) return;
    page.value += 1;
  }

  return {
    commits,
    isLoading,
    error,
    getCommitsByQueryString,
    filteredCommits,
    loadMoreCommits,
    hasMore
  };
})
