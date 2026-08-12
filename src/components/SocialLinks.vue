<script setup lang="ts">
import { computed } from "vue";
import {
  PhEnvelopeSimple,
  PhGithubLogo,
  PhLinkedinLogo,
} from "@phosphor-icons/vue";
import { socialLinks, type SocialIcon } from "../data/socials";

const props = withDefaults(
  defineProps<{
    label?: string;
    order?: SocialIcon[];
  }>(),
  {
    label: "Contact Paul",
    order: () => ["email", "github", "linkedin"],
  },
);

const icons: Record<SocialIcon, typeof PhEnvelopeSimple> = {
  email: PhEnvelopeSimple,
  github: PhGithubLogo,
  linkedin: PhLinkedinLogo,
};

const orderedLinks = computed(() =>
  props.order
    .map((icon) => socialLinks.find((link) => link.icon === icon))
    .filter((link): link is (typeof socialLinks)[number] => Boolean(link)),
);
</script>

<template>
  <nav class="social-links" :aria-label="label">
    <a
      v-for="link in orderedLinks"
      :key="link.label"
      :href="link.href"
      :target="link.external ? '_blank' : undefined"
      :rel="link.external ? 'noreferrer' : undefined"
    >
      <component :is="icons[link.icon]" :size="24" weight="regular" aria-hidden="true" />
      <span>{{ link.label }}</span>
    </a>
  </nav>
</template>
