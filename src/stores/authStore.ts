import type { GithubUser } from "@/types/Auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('useAuthStore', () => {
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const token = ref<string | null>(localStorage.getItem('github_token') || null)
  const isAuthenticated = computed(() => !!token.value);

  const router = useRouter();

  const login = () => {
    // @todo add state
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    window.location.href = githubAuthUrl;
  }


  const handleAuth = async (newToken: string) => {
    // @todo add state check
    token.value = newToken;
    localStorage.setItem('github_token', newToken);
    router.replace({'path': '/repositories'})
      }

  const { data } = useQuery({
    queryKey: ['user', token.value],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }
      return response.json()
    },
    enabled: computed(() => isAuthenticated.value),
    retry: false
  });

  const user = computed(() => data.value as GithubUser | null);

  const logout = () => {
    token.value = null
    localStorage.removeItem('github_token');
     router.replace({ 'path': '/' })

  }



  return {
    isAuthenticated,
    login,
    token,
    handleAuth,
    logout,
    user,
  }
})
