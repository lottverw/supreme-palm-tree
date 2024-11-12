<script setup lang="ts">
import { useCommits } from '@/composables/useCommits';
import { useRoute } from 'vue-router';
    const route = useRoute();
    const { commits } = useCommits(route.params.owner, route.params.repo)
</script>


<template>
    <h1>Repository {{ route.params.repo }}</h1>

    <ul v-for="commit in commits">
        <li>{{ commit.sha }}</li>
    </ul>

</template>