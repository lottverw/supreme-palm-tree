export const RepositoryService = {
  async getRepositories(token: string) {
    const response = await fetch(`https://api.github.com/user/repos?sort=pushed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.message || 'Failed to fetch repositories');
    }

    return response.json()
  },
  getRepositoryByName(repositories: Repository[], repositoryName: string) {
    return repositories.find(repository => repository.name === repositoryName);
  }
}
