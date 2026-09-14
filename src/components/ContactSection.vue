<template>
  <section id="contact" class="section contact">
    <div class="container">
      <!-- 大面积糖果色只在这一张 callout 卡上出现 -->
      <div class="contact-card reveal">
        <svg class="sketch contact-sketch" viewBox="0 0 140 90" fill="none" aria-hidden="true">
          <path
            d="M8 60c14-34 38-50 62-46 20 3 30 18 26 34-3 13-16 20-27 15-9-4-11-16-3-22 9-7 22-1 24 9"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>

        <span class="mono-label contact-eyebrow">{{ contact.eyebrow }}</span>

        <h2 class="section-title contact-title">
          <span v-for="(line, i) in contact.title.split('\n')" :key="i" class="line">
            <span :class="{ hl: i === contact.title.split('\n').length - 1 }">{{ line }}</span>
          </span>
        </h2>

        <p class="lede contact-lede">{{ contact.lede }}</p>

        <div class="contact-actions">
          <a class="btn btn-primary" :href="contact.primaryCta.href">
            <span class="arrow" aria-hidden="true">→</span>{{ contact.primaryCta.label }}
          </a>
          <a class="btn btn-ghost" :href="contact.secondaryCta.href">
            {{ contact.secondaryCta.label }}
          </a>
        </div>

        <ul class="contact-meta">
          <li>
            <span class="mono-label">Email</span>
            <span class="meta-value">{{ contact.email }}</span>
          </li>
          <li>
            <span class="mono-label">{{ contact.phoneLabel }}</span>
            <span class="meta-value">{{ contact.phone }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/content.js'

const { contact } = site
</script>

<style scoped>
.contact {
  background-color: var(--color-cream-paper);
}

.contact-card {
  position: relative;
  overflow: hidden;
  padding: var(--spacing-64);
  border-radius: var(--radius-2xl);
  background-color: var(--color-sticky-note-mint);
  border: 1px solid var(--color-forest-ink);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-sketch {
  top: 24px;
  right: 32px;
  width: 140px;
  opacity: 0.16;
}

.contact-eyebrow {
  display: block;
  color: var(--color-forest-ink);
  opacity: 0.5;
  margin-bottom: var(--spacing-16);
}

.contact-title {
  display: flex;
  flex-direction: column;
}

.contact-title .line {
  display: block;
}

.contact-lede {
  margin-top: var(--spacing-24);
  max-width: 520px;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-16);
  margin-top: var(--spacing-40);
}

/* 绿色卡面上的次级按钮：底色融进卡面，只留描边 */
.contact-actions .btn-ghost {
  border-color: var(--color-forest-ink);
}

.contact-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-40);
  margin-top: var(--spacing-48);
  padding-top: var(--spacing-32);
  border-top: 1px solid rgba(26, 51, 0, 0.18);
  width: 100%;
}

.contact-meta li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.contact-meta .mono-label {
  color: var(--color-forest-ink);
  opacity: 0.5;
}

.meta-value {
  font-family: var(--font-roboto-mono);
  font-size: var(--text-body-sm);
  color: var(--color-forest-ink);
}

@media (max-width: 768px) {
  .contact-card {
    padding: var(--spacing-40) var(--spacing-24);
  }
  .contact-sketch {
    display: none;
  }
  .contact-meta {
    gap: var(--spacing-24);
  }
}
</style>
