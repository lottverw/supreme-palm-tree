import { computed } from "vue";
import { useQuery } from "vue-query";

export function useCommits(owner: string, repository: string) {
    // todo state management
    const token = localStorage.getItem('github_token');

    const { data } = useQuery({
        queryKey: ["commits", repository],
        queryFn: async () => {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repository}/commits`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch repositories');
            }

            return response.json()
        }
    })

    const commits = computed(() => data.value || []);


    return { commits };
}
