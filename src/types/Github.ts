interface Commit {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        }
    }
}

interface Owner {
    login: string;
    id: number;
    avatar_url: string;
    url:string;
}

interface Repository {
    id: number;
    name: string;
    description: string | null;
    owner: Owner;
    language: string;

}
