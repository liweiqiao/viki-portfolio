<template>
  <section id="works" class="section works">
    <div class="container">
      <header class="works-head reveal">
        <span class="mono-label works-eyebrow">{{ works.eyebrow }}</span>
        <h2 class="section-title">{{ works.title }}</h2>
        <p class="lede works-lede">{{ works.lede }}</p>
      </header>

      <!-- 筛选 -->
      <div class="works-filters reveal" role="tablist" aria-label="作品分类筛选">
        <button
          v-for="f in works.filters"
          :key="f.key"
          type="button"
          role="tab"
          :aria-selected="String(active === f.key)"
          :class="['filter', { 'filter-active': active === f.key }]"
          @click="active = f.key"
        >
          {{ f.label }}
          <span class="filter-count">{{ countOf(f.key) }}</span>
        </button>
      </div>

      <!-- 网格 -->
      <ul class="works-grid">
        <li
          v-for="item in filtered"
          :key="item.id"
          class="work-card"
          :data-tone="item.tone"
        >
          <div class="card-tags">
            <span class="card-tag card-tag-solid">{{ item.platform }}</span>
            <span class="card-tag">{{ item.type }}</span>
            <span class="card-tag">{{ item.topic }}</span>
          </div>

          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>

          <a v-if="item.link" class="card-link" :href="item.link">
            <span class="mono-label">查看</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>
          <span v-else class="card-foot mono-label">{{ item.categoryLabel || '原创内容' }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { site } from '../data/content.js'

const { works } = site
const active = ref('all')

const filtered = computed(() =>
  active.value === 'all' ? works.items : works.items.filter((i) => i.category === active.value)
)

function countOf(key) {
  if (key === 'all') return works.items.length
  return works.items.filter((i) => i.category === key).length
}
</script>

<style scoped>
.works {
  background-color: var(--color-cream-paper);
  border-top: 1px solid var(--color-whisper-gray);
}

.works-head {
  max-width: 680px;
  margin-bottom: var(--spacing-40);
}

.works-eyebrow {
  display: block;
  color: var(--color-pencil-gray);
  margin-bottom: var(--spacing-16);
}

.works-lede {
  margin-top: var(--spacing-16);
  font-size: var(--text-body);
  max-width: 560px;
}

/* ---------- 筛选胶囊 ---------- */
.works-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: var(--spacing-40);
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: var(--radius-tags);
  border: 1px solid var(--color-pencil-gray);
  background-color: transparent;
  font-family: var(--font-inter);
  font-size: var(--text-caption);
  font-weight: var(--font-weight-medium);
  color: var(--color-forest-ink);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

.filter:hover {
  border-color: var(--color-forest-ink);
}

/* 选中态用 Forest Ink 填充，呼应主色权威 */
.filter-active {
  background-color: var(--color-forest-ink);
  border-color: var(--color-forest-ink);
  color: var(--color-cream-paper);
}

.filter-count {
  font-family: var(--font-roboto-mono);
  font-size: 11px;
  opacity: 0.6;
}

/* ---------- 卡片网格 ---------- */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-24);
}

.work-card {
  display: flex;
  flex-direction: column;
  padding: var(--card-padding);
  border-radius: var(--radius-cards);
  border: 1px solid var(--color-forest-ink);
  background-color: var(--color-cream-paper);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

/* hover 不用阴影，靠位移与底色变化做反馈 */
.work-card:hover {
  transform: translateY(-4px);
  background-color: #f8f5ee;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--spacing-24);
}

.card-tag {
  padding: 4px 10px;
  border-radius: var(--radius-tags);
  border: 1px solid var(--color-pencil-gray);
  font-family: var(--font-roboto-mono);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  color: var(--color-forest-ink);
  opacity: 0.75;
}

.card-tag-solid {
  background-color: var(--color-highlighter-yellow);
  border-color: var(--color-highlighter-yellow);
  opacity: 1;
}

.card-title {
  font-family: var(--font-inter);
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-16);
}

.card-desc {
  font-size: var(--text-body-sm);
  line-height: 1.6;
  color: #3c4a2c;
  flex-grow: 1;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--spacing-24);
  color: var(--color-forest-ink);
}

.card-link .arrow {
  transition: transform 0.18s ease;
}

.card-link:hover .arrow {
  transform: translateX(4px);
}

.card-foot {
  margin-top: var(--spacing-24);
  color: var(--color-pencil-gray);
}

/* 卡片入场：筛选切换时新出现的卡片重播，不必重建整个列表 */
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.work-card {
  animation: cardIn 0.32s ease backwards;
}

@media (prefers-reduced-motion: reduce) {
  .work-card {
    animation: none;
  }
}

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
  .card-title {
    font-size: 20px;
  }
}
</style>
