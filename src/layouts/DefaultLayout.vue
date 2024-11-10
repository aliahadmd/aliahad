<template>
    <div class="min-h-screen flex flex-col font-geist">
      <NavBar />
      <main class="flex-grow container py-8">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import NavBar from '../components/NavBar.vue'
  import Footer from '../components/Footer.vue'
  </script>