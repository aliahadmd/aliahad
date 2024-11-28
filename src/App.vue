<template>
  <div class="font-geist min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    <nav class="bg-white shadow-md dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8">
            <RouterLink 
              to="/" 
              class="flex items-center text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 font-geist font-medium"
              active-class="text-blue-600 dark:text-blue-400"
            >
              About Me
            </RouterLink>
            <RouterLink 
              to="/notes" 
              class="flex items-center text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 font-geist font-medium"
              active-class="text-blue-600 dark:text-blue-400"
            >
              Notes
            </RouterLink>
            <RouterLink 
              to="/portfolio" 
              class="flex items-center text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 font-geist font-medium"
              active-class="text-blue-600 dark:text-blue-400"
            >
              Portfolio
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
    <ThemeToggle />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useThemeStore } from './stores/theme';
import ThemeToggle from './components/ThemeToggle.vue';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initializeTheme();
});
</script>
