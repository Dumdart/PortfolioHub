<script setup lang="ts">
import { Icon } from "@iconify/vue";
import azureIcon from "@iconify-icons/logos/microsoft-azure";
import csharpIcon from "@iconify-icons/logos/c-sharp";
import dockerIcon from "@iconify-icons/logos/docker-icon";
import dotnetIcon from "@iconify-icons/logos/dotnet";
import postgresqlIcon from "@iconify-icons/logos/postgresql";
import pythonIcon from "@iconify-icons/logos/python";
import typescriptIcon from "@iconify-icons/logos/typescript-icon";
import mqttIcon from "@iconify-icons/simple-icons/mqtt";
import sqlServerIcon from "@iconify-icons/simple-icons/microsoftsqlserver";

const techs = [
    {
        name: "Primary",
        technologies: [
            { name: "C#", icon: csharpIcon, className: "csharp" },
            { name: "Python", icon: pythonIcon, className: "python" },
            {
                name: "TypeScript",
                icon: typescriptIcon,
                className: "typescript",
            },
            { name: ".NET", icon: dotnetIcon, className: "dotnet" },
            {
                name: "Microsoft SQL Server",
                icon: sqlServerIcon,
                className: "sql",
                color: "#cc2927",
            },
            { name: "PostgreSQL", icon: postgresqlIcon, className: "postgres" },
        ],
    },
    {
        name: "Infrastructure / Integration",
        technologies: [
            { name: "Docker", icon: dockerIcon, className: "docker" },
            { name: "REST APIs", mark: "{ API }", className: "rest" },
            { name: "Azure", icon: azureIcon, className: "azure" },
            {
                name: "MQTT",
                icon: mqttIcon,
                className: "mqtt",
                color: "#660066",
            },
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
