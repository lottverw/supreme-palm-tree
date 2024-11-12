import { useQuery } from "vue-query";
import { computed } from "vue";

export function useRepositories() {

    // todo state management in pinia
    const token = localStorage.getItem('github_token');

    const { data, isLoading, error } = useQuery({
        queryKey: ['repositories', token],
        queryFn: async () => {
            const response = await fetch(`https://api.github.com/user/repos`, {
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
        enabled: computed(() => !!token),
        retry: false
    })

    const repositories = computed(() => data.value || []);

    return {
        repositories,
        isLoading,
        error
    }
}