<script setup lang="ts">
const capabilityGroups = [
  {
    number: "01",
    title: "Backend & APIs",
    skills: [".NET", "ASP.NET Core", "EF Core", "Azure Functions"],
  },
  {
    number: "02",
    title: "Frontend",
    skills: ["Vue 3", "TypeScript", "Angular", "Accessible UI"],
  },
  {
    number: "03",
    title: "Cloud & delivery",
    skills: ["Azure", "Docker", "GitHub Actions", "Caddy"],
  },
  {
    number: "04",
    title: "Data",
    skills: ["PostgreSQL", "MSSQL", "Cosmos DB", "SQL design"],
  },
  {
    number: "05",
    title: "Automation & devices",
    skills: ["Python", "MQTT", "ESP32", "Loxone"],
  },
  {
    number: "06",
    title: "Mobile & systems",
    skills: ["Kotlin Multiplatform", "REST", "Offline workflows"],
  },
];
</script>

<template>
  <section class="skills-panel" aria-labelledby="skills-heading">
    <div class="skills-panel__intro">
      <span>Core capabilities</span>
      <h2 id="skills-heading">Skills used to ship complete systems.</h2>
    </div>

    <div class="skills-panel__grid">
      <article v-for="group in capabilityGroups" :key="group.number">
        <span class="skills-panel__number">{{ group.number }}</span>
        <div>
          <h3>{{ group.title }}</h3>
          <p>{{ group.skills.join(" · ") }}</p>
        </div>
      </article>
    </div>

    <p class="skills-panel__note">
      Applied across SmartHomeBridge, ClipStack, NOVA, PortfolioHub, and Serverless Portfolio Hub.
    </p>
  </section>
</template>
