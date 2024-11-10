<template>
 <div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/aboutme">About Me</router-link></li>
            <li><router-link to="/portfolio">Portfolio</router-link></li>
      </ul>
      
    </div>
    <a class="btn btn-ghost text-xl">Ali.</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/aboutme">About Me</router-link></li>
            <li><router-link to="/portfolio">Portfolio</router-link></li>
    </ul>
  </div>
  <div class="navbar-end">
    <select class="select select-bordered ml-4" v-model="theme" @change="updateTheme">
            <option value="cupcake">Light</option>
            <option value="forest">Dark</option>
          </select>
  </div>
</div>

















    <div class="divider m-0"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const theme = ref('cupcake')
  
  const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
  }
  
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'cupcake'
    theme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  })
  </script>