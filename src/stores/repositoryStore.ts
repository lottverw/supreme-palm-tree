import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from 'vue-query';
import { useAuthStore } from './authStore';
import { RepositoryService } from '@/services/RepositoryService';

export const useRepositoryStore = defineStore('useRepositoryStore', () => {
  const { isAuthenticated, token } = useAuthStore();

  const repositories = ref<Repository[]>([])
  const selectedRepository = ref<Repository>();
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['repositories'],
    queryFn: async () => {
      if(!token) return [];
      return RepositoryService.getRepositories(token);
    },
    enabled: computed(() => !!isAuthenticated),
    retry: false,
    onSuccess: (data: Repository[]) => {
      repositories.value = data;
    }

  })

  isLoading.value = queryLoading;
  error.value = queryError;

  const setSelectedRepository = (repoName: string) => {
    console.log('repo name setSelectedRepository', repoName)
    selectedRepository.value = RepositoryService.getRepositoryByName(repositories.value, repoName);
  };


  return {
    repositories: computed(() => data.value || []),
    isLoading,
    error,
    setSelectedRepository,
    selectedRepository
  }
})
