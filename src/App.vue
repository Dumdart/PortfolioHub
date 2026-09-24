<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
const introHidden = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => { introHidden.value = false; });
</script>

<template>
  <div class="app-shell">
    <SiteHeader :intro-hidden="introHidden" />
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in">
        <component :is="Component" @intro-navigation="introHidden = $event" />
      </Transition>
    </RouterView>
  </div>
</template>
