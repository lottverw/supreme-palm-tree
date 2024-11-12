<script setup lang="ts">

import { useAuth } from '../composables/useAuth';
import { onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const router = useRoute()
const { isAuthenticated, login, handleAuth, user } = useAuth();

onMounted(() => {
    const accessToken = router.query.token as string | undefined;
    if (accessToken) {
        handleAuth(accessToken);
    }
})

</script>


<template>
    <div class="auth" v-if="!isAuthenticated">
        <h1>Login</h1>

        <button @click="login()">
            Login with GitHub
        </button>
    </div>
    <div v-else>
        <h1>Welcome {{ user?.login }}</h1>
        <RouterLink to="/repositories">Go to my respositories</RouterLink>
    </div>
</template>
