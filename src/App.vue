<template>
  <DefaultLayout>
    <Suspense>
      <router-view />
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      </template>
    </Suspense>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue'
</script>