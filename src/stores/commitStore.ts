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

  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ["commits", selectedRepository],
    queryFn: () => {
      if (!selectedRepository.value) {
        console.error('No repository selected.');
        return;
      }
      return CommitService.getCommits(selectedRepository.value)
    },
    enabled: isAuthenticated,
    onSuccess: (data: Commit[]) => {
      commits.value = data;
      filteredCommits.value = data;
    }
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

  return {
    commits,
    isLoading,
    error,
    getCommitsByQueryString,
    filteredCommits
  };
})
