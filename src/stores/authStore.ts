import { AuthService } from "@/services/AuthService";
import type { GithubUser } from "@/types/Auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('useAuthStore', () => {
  const token = ref<string | null>(AuthService.getToken());
  const isAuthenticated = computed(() => !!token.value);
  const router = useRouter();

  const login = () => {
    // @todo add state
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    window.location.href = AuthService.getGitHubAuthUrl(GITHUB_CLIENT_ID);
  }

  const handleAuth = async (newToken: string) => {
    // @todo add state check
    token.value = newToken;
    AuthService.saveToken(newToken);
    router.replace({ 'path': '/repositories' })
  }

  const { data } = useQuery({
    queryKey: ['user', token],
    queryFn: () => {
      if (!token.value) return null;
      return AuthService.getUserData(token.value);
    },
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const user = computed(() => data.value as GithubUser | null);

  const logout = () => {
    token.value = null;
    AuthService.clearToken();
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
