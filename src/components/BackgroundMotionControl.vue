<script setup lang="ts">
import { useReducedMotion } from "../composables/useReducedMotion";

const paused = defineModel<boolean>({ default: false });
const reduced = useReducedMotion();
</script>

<template>
  <button v-if="!reduced" class="background-motion-control" type="button"
    :aria-pressed="paused" @click="paused = !paused">
    {{ paused ? 'Resume background' : 'Pause background' }}
  </button>
</template>

<style scoped>
.background-motion-control {
  display: block;
  margin-top: 24px;
  min-height: 44px;
  padding: 10px 0;
  border: 0;
  background: transparent;
  color: #b4c9cd;
  font-size: 12px;
  cursor: pointer;
}
.background-motion-control:hover { color: #fff; text-decoration: underline; text-underline-offset: 4px; }
</style>
