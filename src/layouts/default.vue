<template>
    <a-layout class="vue-mode-dark">
        <div class="container">
            <router-link to="/">
                <a-button type="link">Home (part I)</a-button>
            </router-link>
            <router-link to="/sign-up">
                <a-button type="link">Sign Up (part II)</a-button>
            </router-link>
        </div>
        <a-layout-content >
            <div class="container">
                <RouterView />
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<style scoped>

</style>