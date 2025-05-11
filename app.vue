<script setup lang="ts">
// Set default head metadata for the entire app
useHead({
  title: 'My Quiz App',
  meta: [
    { name: 'description', content: 'A quiz application built with Nuxt 3' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <NuxtRouteAnnouncer />
  </NuxtLayout>
</template>