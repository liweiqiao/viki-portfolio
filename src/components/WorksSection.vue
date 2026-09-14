<template>
  <section id="works" class="section works">
    <div class="container">
      <header class="works-head reveal">
        <span class="mono-label works-eyebrow">{{ works.eyebrow }}</span>
        <h2 class="section-title">{{ works.title }}</h2>
        <p class="lede works-lede">{{ works.lede }}</p>
      </header>

      <!-- ---------- 作品集：扫码查看 ---------- -->
      <ul class="collection-grid">
        <li
          v-for="(c, i) in works.collections"
          :key="c.id"
          class="collection-card reveal"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <figure class="qr-frame">
            <img class="qr-img" :src="c.qr" :alt="`${c.label}二维码`" />
            <figcaption class="qr-hint mono-label">扫码查看</figcaption>
          </figure>

          <div class="collection-body">
            <span class="mono-label collection-meta">{{ c.meta }}</span>
            <h3 class="collection-title">{{ c.label }}</h3>
            <p class="collection-desc">{{ c.desc }}</p>

            <ul class="collection-tags">
              <li v-for="t in c.tags" :key="t" class="tag">{{ t }}</li>
            </ul>

            <a class="card-link" :href="c.href" target="_blank" rel="noopener noreferrer">
              <span class="mono-label">也可以点这里打开</span>
              <span class="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </li>
      </ul>

      <!-- ---------- 视频作品：预留位 ---------- -->
      <div class="video-block reveal">
        <header class="video-head">
          <span class="mono-label video-eyebrow">{{ works.videos.eyebrow }}</span>
          <h3 class="video-title">{{ works.videos.title }}</h3>
          <p class="video-note">{{ works.videos.note }}</p>
        </header>

        <ul class="video-grid">
          <li v-for="s in works.videos.slots" :key="s.id" class="video-slot">
            <!-- 填了 src 就自动变成播放器，没填则显示预留位 -->
            <video
              v-if="s.src"
              class="video-el"
              :src="s.src"
              :poster="s.poster || undefined"
              controls
              preload="metadata"
            ></video>

            <div v-else class="video-placeholder">
              <span class="video-badge mono-label">待补充</span>
              <span class="video-plus" aria-hidden="true">+</span>
              <span class="video-hint">{{ s.hint }}</span>
            </div>

            <p class="video-caption">{{ s.label }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/content.js'

const { works } = site
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

/* ---------- 作品集卡片 ---------- */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-24);
}

.collection-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-24);
  padding: var(--card-padding);
  border-radius: var(--radius-cards);
  border: 1px solid var(--color-forest-ink);
  background-color: var(--color-cream-paper);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

/* hover 不用阴影，靠位移与底色变化做反馈 */
.collection-card:hover {
  transform: translateY(-4px);
  background-color: #f8f5ee;
}

/* 二维码托盘：白底 + 细描边，保证静区不被背景吃掉 */
.qr-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  width: 150px;
  padding: 12px 12px 10px;
  margin: 0;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-pencil-gray);
  background-color: #fff;
}

.qr-img {
  width: 100%;
  height: auto;
  /* 二维码是 1:1 方图，先占好位免得加载时抖一下 */
  aspect-ratio: 1 / 1;
}

.qr-hint {
  color: var(--color-pencil-gray);
}

.collection-body {
  flex-grow: 1;
  min-width: 0;
}

.collection-meta {
  display: block;
  color: var(--color-pencil-gray);
  margin-bottom: var(--spacing-8);
}

.collection-title {
  font-family: var(--font-inter);
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-16);
}

.collection-desc {
  font-size: var(--text-body-sm);
  line-height: 1.6;
  color: #3c4a2c;
}

.collection-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--spacing-16);
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

/* ---------- 视频作品 ---------- */
.video-block {
  margin-top: var(--spacing-80);
  padding-top: var(--spacing-40);
  border-top: 1px solid var(--color-pencil-gray);
}

.video-head {
  margin-bottom: var(--spacing-32);
}

.video-eyebrow {
  display: block;
  color: var(--color-pencil-gray);
  margin-bottom: var(--spacing-16);
}

.video-title {
  font-family: var(--font-inter);
  font-size: var(--text-subheading);
  font-weight: var(--font-weight-semibold);
  line-height: 1.25;
  margin-bottom: var(--spacing-8);
}

.video-note {
  font-size: var(--text-caption);
  color: var(--color-pencil-gray);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-24);
}

.video-slot {
  display: flex;
  flex-direction: column;
}

/* 预留位：虚线框，明确表达「这里以后会有东西」 */
.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-cards);
  border: 1px dashed var(--color-pencil-gray);
  background-color: #faf8f2;
}

.video-badge {
  padding: 4px 10px;
  border-radius: var(--radius-tags);
  background-color: var(--color-whisper-gray);
  color: var(--color-pencil-gray);
}

.video-plus {
  font-family: var(--font-bricolage-grotesque);
  font-size: 26px;
  font-weight: var(--font-weight-extrabold);
  line-height: 1;
  color: var(--color-pencil-gray);
}

.video-hint {
  font-size: 12px;
  color: var(--color-pencil-gray);
}

.video-el {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-cards);
  border: 1px solid var(--color-forest-ink);
  background-color: #000;
  object-fit: cover;
}

.video-caption {
  margin-top: var(--spacing-16);
  font-size: var(--text-caption);
  font-weight: var(--font-weight-medium);
}

/* ---------- 响应式 ---------- */
@media (max-width: 1024px) {
  .collection-grid {
    grid-template-columns: 1fr;
  }
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .video-block {
    margin-top: var(--spacing-48);
  }
}

@media (max-width: 640px) {
  .collection-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .collection-body {
    width: 100%;
  }
  .collection-tags {
    justify-content: center;
  }
  .collection-title {
    font-size: 20px;
  }
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
