import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from 'vue-query';
import { useAuthStore } from './authStore';

export const useRepositoryStore = defineStore('useRepositoryStore', () => {
  const repositories = ref<Repository[]>([])
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const { isAuthenticated, token } = useAuthStore();

  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['repositories', token],
    queryFn: async () => {

      if (!token) {
        throw new Error('Unable to authenticate');
      }

      const response = await fetch(`https://api.github.com/user/repos?sort=pushed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch repositories');
      }

      return response.json()
    },
    enabled: computed(() => !!isAuthenticated),
    retry: false,
    onSuccess: (data: Repository[]) => {
      repositories.value = data;
    },
  })

  isLoading.value = queryLoading;
  error.value = queryError;

  const getRepoByName = (repoName: string) => {
    return repositories.value.find(repo => repo.name === repoName);
  };

  return {
    repositories: computed(() => data.value || []),
    isLoading,
    error,
    getRepoByName
  }
})
