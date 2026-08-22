<script setup lang="ts">
import { Icon } from "@iconify/vue";
import angularIcon from "@iconify-icons/logos/angular-icon";
import azureIcon from "@iconify-icons/logos/microsoft-azure";
import csharpIcon from "@iconify-icons/logos/c-sharp";
import dockerIcon from "@iconify-icons/logos/docker-icon";
import dotnetIcon from "@iconify-icons/logos/dotnet";
import kotlinIcon from "@iconify-icons/logos/kotlin-icon";
import postgresqlIcon from "@iconify-icons/logos/postgresql";
import pythonIcon from "@iconify-icons/logos/python";
import typescriptIcon from "@iconify-icons/logos/typescript-icon";
import vueIcon from "@iconify-icons/logos/vue";
import espressifIcon from "@iconify-icons/simple-icons/espressif";
import mqttIcon from "@iconify-icons/simple-icons/mqtt";
import sqlServerIcon from "@iconify-icons/simple-icons/microsoftsqlserver";

const technologies = [
  { name: ".NET", icon: dotnetIcon, className: "dotnet" },
  { name: "C#", icon: csharpIcon, className: "csharp" },
  { name: "Microsoft SQL Server", icon: sqlServerIcon, className: "sql", color: "#cc2927" },
  { name: "TypeScript", icon: typescriptIcon, className: "typescript" },
  { name: "Angular", icon: angularIcon, className: "angular" },
  { name: "Vue 3", icon: vueIcon, className: "vue" },
  { name: "Python", icon: pythonIcon, className: "python" },
  { name: "Docker", icon: dockerIcon, className: "docker" },
  { name: "Azure", icon: azureIcon, className: "azure" },
  { name: "PostgreSQL", icon: postgresqlIcon, className: "postgres" },
  { name: "MQTT", icon: mqttIcon, className: "mqtt", color: "#660066" },
  { name: "ESP32", icon: espressifIcon, className: "esp", color: "#e7352c" },
  { name: "Kotlin Multiplatform", icon: kotlinIcon, className: "kotlin" },
  { name: "REST APIs", mark: "{ API }", className: "rest" },
];
</script>

<template>
  <section class="skills-panel" aria-labelledby="skills-heading">
    <h2 id="skills-heading" class="sr-only">Technology stack</h2>

    <div class="skills-panel__stickers" aria-label="Technology stack">
      <div
        v-for="technology in technologies"
        :key="technology.name"
        class="tech-sticker"
        :class="`tech-sticker--${technology.className}`"
        :aria-label="technology.name"
        role="img"
      >
        <Icon
          v-if="technology.icon"
          :icon="technology.icon"
          class="tech-sticker__logo"
          :style="technology.color ? { color: technology.color } : undefined"
          aria-hidden="true"
        />
        <span v-else class="tech-sticker__mark" aria-hidden="true">{{ technology.mark }}</span>
        <span class="tech-sticker__name">{{ technology.name }}</span>
      </div>
    </div>
  </section>
</template>
