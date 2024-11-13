## Project Setup

```sh
npm install
```

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