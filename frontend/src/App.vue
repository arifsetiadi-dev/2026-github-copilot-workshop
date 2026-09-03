<template>
  <div class="layout">
    <header class="navbar">
      <span class="navbar-brand">Procurement MVP</span>
      <nav>
        <RouterLink to="/" :class="{ active: isDashboard }">Dashboard</RouterLink>
        <RouterLink to="/requisitions" :class="{ active: isRequisitions }">Purchase Requisitions</RouterLink>
        <button
          type="button"
          class="theme-toggle"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="5" fill="var(--icon-sun)" />
            <path stroke="var(--icon-sun)" stroke-width="2" stroke-linecap="round" d="M12 3V1M12 23v-2M3 12H1m22 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4 4.2 19.8m15.6-15.6-1.4 1.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="var(--icon-moon)" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        </button>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useTheme } from './composables/useTheme';

const route = useRoute();
const isDashboard = computed(() => route.path === '/');
const isRequisitions = computed(() => route.path.startsWith('/requisitions'));
const { isDark, toggleTheme } = useTheme();
</script>
