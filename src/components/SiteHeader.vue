<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);

const routeClass = computed(() => `header--${String(route.name ?? "home")}`);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);

const closeMenu = async (restoreFocus = false) => {
  menuOpen.value = false;
  if (restoreFocus) {
    await nextTick();
    menuButton.value?.focus();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && menuOpen.value) {
    void closeMenu(true);
  }
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <header class="site-header" :class="routeClass">
    <RouterLink class="wordmark" to="/" aria-label="Paul Thumfart, home">
      Paul Thumfart
    </RouterLink>

    <button
      ref="menuButton"
      class="menu-button"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="primary-navigation"
      @click="menuOpen = !menuOpen"
    >
      <span class="menu-button__icon" :class="{ 'is-open': menuOpen }" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
      <span>{{ menuOpen ? "Close" : "Menu" }}</span>
    </button>

    <nav id="primary-navigation" class="primary-nav" :class="{ 'primary-nav--open': menuOpen }">
      <RouterLink to="/projects" @click="closeMenu()">Projects</RouterLink>
      <RouterLink to="/goals" @click="closeMenu()">Goals &amp; Plans</RouterLink>
      <RouterLink to="/about" @click="closeMenu()">About</RouterLink>
    </nav>
  </header>
</template>
