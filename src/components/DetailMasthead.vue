<script setup lang="ts">
import SignalBackdrop from "./SignalBackdrop.vue";
defineProps<{ title: string; introduction: string }>();
</script>

<template>
  <header class="detail-masthead">
    <SignalBackdrop variant="about" night-sky />
    <div class="detail-masthead__content">
      <h1>{{ title }}</h1>
      <p>{{ introduction }}</p>
    </div>
  </header>
</template>
