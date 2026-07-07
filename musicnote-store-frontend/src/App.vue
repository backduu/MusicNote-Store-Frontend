<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="p-4 bg-gray-100 dark:bg-gray-800">
    <nav class="container mx-auto flex gap-4">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
    </nav>
  </header>

  <main class="container mx-auto p-4">
    <RouterView />
  </main>
</template>

<style scoped>
</style>
