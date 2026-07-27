<script setup lang="ts">
import { PhArrowRight } from "@phosphor-icons/vue";

withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    variant?: "primary" | "secondary" | "text";
    external?: boolean;
  }>(),
  {
    variant: "primary",
    external: false,
  },
);
</script>

<template>
  <a
    v-if="href"
    class="action-link"
    :class="`action-link--${variant}`"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
  >
    <slot />
    <PhArrowRight :size="20" aria-hidden="true" />
  </a>
  <RouterLink v-else class="action-link" :class="`action-link--${variant}`" :to="to ?? '/'">
    <slot />
    <PhArrowRight :size="20" aria-hidden="true" />
  </RouterLink>
</template>
