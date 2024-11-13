## Project Setup

First, you need to create an OAuth application in GitLab.

    1. Go to your GitLab account.
    2. Navigate to User Settings (click your profile picture at the top right) → Applications.
    3. Create a new application by filling in the form:
        Name: Name of your app.
        Homepage app: http://localhost:3000/
        Authorization callback URL: http://localhost:3001/api/auth/callback

    Once the application is created, GitLab will provide you with:
        Client ID: Unique ID for your application.
        Client Secret: Secret key for authenticating your app.


``` env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
VITE_GITHUB_CLIENT_ID=
VITE_GITHUB_CLIENT_SECRET=
BASE_URL=http://localhost:3001
```

```sh
npm install
```

### run app 
```sh
npm run dev
```

seperate tab 
```sh
vercel dev
```
After running this command versel wil ask you to login. You can do so with the github account.

## Run test

```sh
npx vitest run
```


## ES6 functions
### Spread operator
In the commitStore I'm using the sread operator to easily cobine the old values with the new values received from the api 

```Javascript
 onSuccess: (data: Commit[]) => {
      ///...
      commits.value = [...commits.value, ...data];
      filteredCommits.value = [...commits.value, ...data];
    },
```

### Object destructuring
I'm using object destructuring to shorten the code, keep it readable because and only import the variables exposed by the auth store based on my current needs. 
```
const { isAuthenticated, login, handleAuth } = authStore;
```
If I wouldn't us the destructuring methods the code would be longer and look like this: 
```
const isAuthenticated = authStore.isAuthenticated;
const login = authStore.login;
const handleAuth = authStore.handleAuth;
```

### Filter
Makes it easy to return all elements that match the given test in this case the message sould contain the search element
```
    return commits.filter(commit =>
      commit.commit.message.toLowerCase().includes(search)
    );
```