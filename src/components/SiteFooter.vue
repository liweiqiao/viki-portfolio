<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-mark" aria-hidden="true">{{ brand.monogram }}</span>
        <div class="footer-text">
          <span class="footer-name">{{ brand.name }}</span>
          <span class="footer-note">{{ footer.note }}</span>
        </div>
      </div>

      <nav class="footer-nav" aria-label="页脚导航">
        <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <span class="footer-meta mono-label">{{ footer.meta }}</span>
    </div>
  </footer>
</template>

<script setup>
import { site } from '../data/content.js'

const { brand, nav, footer } = site
</script>

<style scoped>
.footer {
  padding: var(--spacing-48) 0;
  border-top: 1px solid var(--color-pencil-gray);
  background-color: var(--color-cream-paper);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-24);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-md);
  background-color: var(--color-highlighter-yellow);
  font-family: var(--font-display-cn);
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  transform: rotate(-5deg);
}

.footer-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-name {
  font-size: var(--text-caption);
  font-weight: var(--font-weight-semibold);
}

.footer-note {
  font-size: 12px;
  color: var(--color-pencil-gray);
  max-width: 320px;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-24);
}

.footer-nav a {
  font-size: var(--text-caption);
  font-weight: var(--font-weight-medium);
}

.footer-nav a:hover {
  text-decoration: underline;
  text-decoration-color: var(--color-highlighter-yellow);
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}

.footer-meta {
  color: var(--color-pencil-gray);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
