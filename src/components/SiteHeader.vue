<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false);

const routeClass = computed(() => `header--${String(route.name ?? "home")}`);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="site-header" :class="routeClass">
    <RouterLink class="wordmark" to="/" aria-label="Paul Thumfart, home">
      Paul Thumfart
    </RouterLink>

    <button
      class="menu-button"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="primary-navigation"
      @click="menuOpen = !menuOpen"
    >
      {{ menuOpen ? "Close" : "Menu" }}
    </button>

    <nav id="primary-navigation" class="primary-nav" :class="{ 'primary-nav--open': menuOpen }">
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/goals">Goals &amp; Plans</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>
