export const AuthService = {
  getGitHubAuthUrl: (clientId: string) => {
    return `https://github.com/login/oauth/authorize?client_id=${clientId}`
  },
  getToken(){
    return localStorage.getItem('github_token') || null
  },
  saveToken(token: string) {
    localStorage.setItem('github_token', token);
  },
  clearToken() {
    localStorage.removeItem('github_token');
  },
  async getUserData(token: string) {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user data');
    }
    return response.json()
  }
}
