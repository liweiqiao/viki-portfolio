<template>
  <section id="services" class="section services">
    <div class="container">
      <header class="services-head reveal">
        <span class="mono-label services-eyebrow">{{ services.eyebrow }}</span>
        <h2 class="section-title">{{ services.title }}</h2>
        <p class="lede services-lede">{{ services.lede }}</p>
      </header>

      <ul class="services-grid">
        <li
          v-for="(item, i) in services.items"
          :key="item.index"
          class="service-card reveal"
          :style="{ transitionDelay: `${i * 110}ms` }"
        >
          <!-- 糖果色只出现在这一小块，做便签标签角 -->
          <span :class="['service-index', `tone-${item.tone}`]">{{ item.index }}</span>

          <h3 class="service-title">{{ item.title }}</h3>
          <p class="service-desc">{{ item.desc }}</p>

          <ul class="service-points">
            <li v-for="p in item.points" :key="p">{{ p }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/content.js'

const { services } = site
</script>

<style scoped>
.services {
  background-color: var(--color-cream-paper);
  border-top: 1px solid var(--color-whisper-gray);
}

.services-head {
  max-width: 680px;
  margin-bottom: var(--spacing-48);
}

.services-eyebrow {
  display: block;
  color: var(--color-pencil-gray);
  margin-bottom: var(--spacing-16);
}

.services-lede {
  margin-top: var(--spacing-16);
  font-size: var(--text-body);
  max-width: 540px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-32);
}

.service-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-32);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-forest-ink);
  background-color: var(--color-cream-paper);
}

.service-index {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: var(--spacing-24);
  border-radius: var(--radius-md);
  font-family: var(--font-roboto-mono);
  font-size: 15px;
  color: var(--color-forest-ink);
}

.tone-mint {
  background-color: var(--color-sticky-note-mint);
}
.tone-teal {
  background-color: var(--color-sticky-note-teal);
}
.tone-blush {
  background-color: var(--color-sticky-note-blush);
}

.service-title {
  font-family: var(--font-inter);
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-16);
}

.service-desc {
  font-size: var(--text-body-sm);
  line-height: 1.6;
  color: #3c4a2c;
  flex-grow: 1;
}

.service-points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--spacing-24);
  padding-top: var(--spacing-24);
  border-top: 1px solid var(--color-whisper-gray);
}

.service-points li {
  padding: 4px 10px;
  border-radius: var(--radius-tags);
  border: 1px solid var(--color-pencil-gray);
  font-family: var(--font-roboto-mono);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  color: var(--color-forest-ink);
  opacity: 0.75;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-24);
  }
}
</style>
