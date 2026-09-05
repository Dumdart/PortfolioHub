<script setup lang="ts">
import { PhGraduationCap } from "@phosphor-icons/vue";
import ActionLink from "../components/ActionLink.vue";
import HomeSkillsPanel from "../components/HomeSkillsPanel.vue";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import SocialLinks from "../components/SocialLinks.vue";
</script>

<template>
  <main class="home-page">
    <SignalBackdrop variant="home" />

    <section class="home-hero">
      <section class="home-profile" aria-label="Profile">
        <div class="portrait-anchor">
          <img src="/assets/black-cat-profile.jpg" alt="Paul Thumfart's black cat profile picture" />
        </div>

        <div class="profile-identity">
          <h2>Paul<br />Thumfart</h2>
          <p>Backend Software Engineer<br />
          APIs · Data · Developer Tools</p>
        </div>
      </section>

      <div class="home-copy">
        <h1>Backend software for APIs, data and developer tools.</h1>
        <p>
            C#, Python and Go across APIs, databases, automation and infrastructure.
        </p>
      </div>

      <div class="home-utility">
        <div class="home-actions">
          <ActionLink to="/projects">Open project map</ActionLink>
        </div>

        <SocialLinks label="Contact and social links" />

        <div class="qualification">
          <PhGraduationCap :size="24" weight="light" aria-hidden="true" />
          <span>HTL Neufelden Business Informatics · Graduated 2026 · Upper Austria</span>
        </div>

        <svg class="mobile-signal-divider" viewBox="0 0 390 34" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 11C48 28 78 1 128 14C178 27 212 3 260 15C310 27 344 4 390 12V34H0Z" />
        </svg>
      </div>

      <div class="home-skills-wrap">
        <HomeSkillsPanel />
      </div>
    </section>
  </main>
</template>
