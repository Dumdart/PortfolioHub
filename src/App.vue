<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
