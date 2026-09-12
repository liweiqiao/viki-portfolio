<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about-grid">
        <!-- 左栏：叙述 -->
        <div class="about-main">
          <span class="mono-label about-eyebrow reveal">{{ about.eyebrow }}</span>

          <h2 class="section-title about-title reveal">
            <span v-for="(line, i) in about.title.split('\n')" :key="i" class="line">{{ line }}</span>
          </h2>

          <div class="about-copy reveal">
            <p v-for="(p, i) in about.paragraphs" :key="i" class="body-text">{{ p }}</p>
          </div>

          <ul class="about-tags reveal">
            <li v-for="t in about.tags" :key="t" class="tag">{{ t }}</li>
          </ul>
        </div>

        <!-- 右栏：便签卡，同列只保留一张糖果色卡面 -->
        <aside class="about-side">
          <div
            v-for="(note, i) in about.notes"
            :key="note.title"
            :class="['note-card', note.tone === 'mint' ? 'note-mint' : 'note-cream', 'reveal']"
            :style="{ transitionDelay: `${i * 90}ms` }"
          >
            <h3 class="note-title">{{ note.title }}</h3>
            <ul class="note-list">
              <li v-for="item in note.items" :key="item">
                <span class="dot" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- 数字条 -->
      <ul class="about-stats reveal">
        <li v-for="s in about.stats" :key="s.label">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/content.js'

const { about } = site
</script>

<style scoped>
.about {
  background-color: var(--color-cream-paper);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.85fr;
  gap: var(--spacing-64);
  align-items: start;
}

/* ---------- 左栏 ---------- */
.about-eyebrow {
  display: block;
  color: var(--color-pencil-gray);
  margin-bottom: var(--spacing-16);
}

.about-title {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-32);
}

.about-title .line {
  display: block;
}

.about-copy {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
  max-width: 620px;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--spacing-32);
}

/* ---------- 右栏便签 ---------- */
.about-side {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
}

.note-title {
  font-family: var(--font-inter);
  font-size: var(--text-body-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-16);
}

.note-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.note-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--text-body-sm);
  line-height: 1.55;
}

.dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-forest-ink);
}

/* ---------- 数字条 ---------- */
.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-16);
  margin-top: var(--spacing-80);
  padding-top: var(--spacing-40);
  border-top: 1px solid var(--color-pencil-gray);
}

.about-stats li {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-family: var(--font-bricolage-grotesque);
  font-size: var(--text-heading-sm);
  font-weight: var(--font-weight-extrabold);
  line-height: 1.05;
  letter-spacing: 0.02em;
}

.stat-label {
  font-family: var(--font-roboto-mono);
  font-size: var(--text-micro);
  letter-spacing: 0.12em;
  color: var(--color-pencil-gray);
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-48);
  }
  .about-stats {
    margin-top: var(--spacing-48);
  }
}

@media (max-width: 480px) {
  .about-stats {
    grid-template-columns: 1fr;
    gap: var(--spacing-24);
  }
}
</style>
