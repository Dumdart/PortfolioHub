<script setup lang="ts">
import { Icon } from "@iconify/vue";
import azureIcon from "@iconify-icons/logos/microsoft-azure";
import csharpIcon from "@iconify-icons/logos/c-sharp";
import javaIcon from "@iconify-icons/logos/java";
import dockerIcon from "@iconify-icons/logos/docker-icon";
import dotnetIcon from "@iconify-icons/logos/dotnet";
import postgresqlIcon from "@iconify-icons/logos/postgresql";
import pythonIcon from "@iconify-icons/logos/python";
import sqliteIcon from "@iconify-icons/simple-icons/sqlite";
import typescriptIcon from "@iconify-icons/logos/typescript-icon";
import vueIcon from "@iconify-icons/logos/vue";
import sqlServerIcon from "@iconify-icons/simple-icons/microsoftsqlserver";

type Technology = {
  name: string;
  icon?: typeof csharpIcon;
  className: string;
  color?: string;
  mark?: string;
};

const techs: { name: string; technologies: Technology[] }[] = [
  {
    name: "Code & Frameworks",
    technologies: [
      { name: "C#", icon: csharpIcon, className: "csharp" },
      { name: "Python", icon: pythonIcon, className: "python" },
      { name: "Java", icon: javaIcon, className: "java" },
      { name: "TypeScript", icon: typescriptIcon, className: "typescript" },
      { name: "Vue", icon: vueIcon, className: "vue" },
    ],
  },
  {
    name: "Platforms & Data",
    technologies: [
      { name: "Azure", icon: azureIcon, className: "azure" },
      { name: "Docker", icon: dockerIcon, className: "docker" },
      { name: ".NET", icon: dotnetIcon, className: "dotnet" },
      { name: "PostgreSQL", icon: postgresqlIcon, className: "postgres" },
      { name: "Microsoft SQL Server", icon: sqlServerIcon, className: "sql" },
      { name: "SQLite", icon: sqliteIcon, className: "sqlite" },
    ],
  },
];
</script>

<template>
    <section class="skills-panel" aria-labelledby="skills-heading">
        <div v-for="tech in techs" :key="tech.name" class="skills-panel__group">
            <h2 class="skills-panel__group-title">
                {{ tech.name }}
            </h2>

            <div class="skills-panel__stickers">
                <div
                    v-for="technology in tech.technologies"
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
                        :style="
                            technology.color
                                ? { color: technology.color }
                                : undefined
                        "
                        aria-hidden="true"
                    />

                    <span v-else class="tech-sticker__mark" aria-hidden="true">
                        {{ technology.mark }}
                    </span>

                    <span class="tech-sticker__name">
                        {{ technology.name }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
