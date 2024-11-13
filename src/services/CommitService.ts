export const CommitService = {
  async getCommits(selectedRepository: Repository) {
    const response = await fetch(`https://api.github.com/repos/${selectedRepository.owner.login}/${selectedRepository.name}/commits?sort=desc`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch repositories');
    }

    return response.json()
  },
  findByQueryString(commits: Commit[], queryString: string) {
    const search = queryString.trim().toLowerCase();

    return commits.filter(commit =>
      commit.commit.message.toLowerCase().includes(search)
    );
  }

}
