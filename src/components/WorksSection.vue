<template>
  <section id="works" class="section works">
    <div class="container">
      <header class="works-head reveal">
        <span class="mono-label works-eyebrow">{{ works.eyebrow }}</span>
        <h2 class="section-title">
          <span v-for="(line, i) in works.title.split('\n')" :key="i" class="line">{{ line }}</span>
        </h2>
        <p class="lede works-lede">{{ works.lede }}</p>
      </header>

      <!-- ---------- 两个作品集 ---------- -->
      <div v-for="c in works.collections" :key="c.id" class="collection reveal">
        <header class="collection-head">
          <div class="collection-heading">
            <span class="mono-label collection-index">{{ c.index }} / 作品集</span>
            <h3 class="collection-title">{{ c.label }}</h3>
            <span class="mono-label collection-meta">{{ c.meta }}</span>
            <p class="collection-desc">{{ c.desc }}</p>
            <ul class="collection-tags">
              <li v-for="t in c.tags" :key="t" class="tag">{{ t }}</li>
            </ul>
          </div>

          <!-- 二维码托盘：想扫原版作品集的人扫这个 -->
          <aside class="qr-panel">
            <img class="qr-img" :src="c.qr" :alt="`${c.label}二维码`" loading="lazy" />
            <span class="mono-label qr-hint">扫码看原版</span>
            <a class="qr-link mono-label" :href="c.href" target="_blank" rel="noopener noreferrer">
              或点这里打开 <span aria-hidden="true">→</span>
            </a>
          </aside>
        </header>

        <ul class="work-grid">
          <li
            v-for="(item, i) in c.items"
            :key="item.id"
            class="work-item"
            :style="{ transitionDelay: `${Math.min(i, 8) * 45}ms` }"
          >
            <!-- 有全文的（政务文档）→ 站内展开阅读 -->
            <button v-if="item.body" type="button" class="work-card" @click="openDoc(item, c)">
              <span class="work-cover doc-cover">
                <span class="doc-head" aria-hidden="true"></span>
                <span class="mono-label doc-kind">{{ item.kind }}</span>
                <span class="doc-glyph" aria-hidden="true">文</span>
                <span v-if="item.file" class="mono-label doc-ext">{{ item.file.split('.').pop().toUpperCase() }}</span>
                <span class="doc-hover mono-label">读全文 <span aria-hidden="true">→</span></span>
              </span>
              <span class="work-body">
                <span class="work-title">{{ item.title }}</span>
                <span class="work-quote">{{ item.excerpt }}</span>
                <span class="mono-label work-from">{{ item.meta }}</span>
              </span>
            </button>

            <!-- 有原文链接的（互联网作品）→ 新窗口打开 -->
            <a
              v-else
              class="work-card"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="work-cover">
                <img :src="item.cover" :alt="item.title" loading="lazy" />
                <span class="doc-hover mono-label">阅读原文 <span aria-hidden="true">→</span></span>
              </span>
              <span class="work-body">
                <span class="mono-label work-tag">{{ item.tag }}</span>
                <span class="work-title">{{ item.title }}</span>
                <span class="mono-label work-from">{{ item.from }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- ---------- 视频作品 ---------- -->
      <div class="video-block reveal">
        <header class="video-head">
          <span class="mono-label video-eyebrow">{{ works.videos.eyebrow }}</span>
          <h3 class="video-title">{{ works.videos.title }}</h3>
          <p class="video-note">{{ works.videos.note }}</p>
        </header>

        <ul class="video-grid">
          <li v-for="s in works.videos.slots" :key="s.id" class="video-slot">
            <div class="video-frame" :class="{ 'is-portrait': s.meta.startsWith('9:16') }">
              <!-- 填了 src 就是播放器，没填则显示预留位 -->
              <video
                v-if="s.src"
                class="video-el"
                :src="s.src"
                :poster="s.poster || undefined"
                controls
                playsinline
                preload="metadata"
              ></video>

              <div v-else class="video-placeholder">
                <span class="video-badge mono-label">待补充</span>
                <span class="video-plus" aria-hidden="true">+</span>
                <span class="video-hint">{{ s.hint }}</span>
              </div>
            </div>

            <p class="video-caption">{{ s.label }}</p>
            <p class="mono-label video-meta">{{ s.meta }} · {{ s.hint }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- ---------- 政务文稿阅读层 ---------- -->
    <Teleport to="body">
      <div v-if="reading" class="reader" role="dialog" aria-modal="true" @click.self="closeDoc">
        <article class="reader-card">
          <button class="reader-close" type="button" aria-label="关闭" @click="closeDoc">✕</button>

          <header class="reader-head">
            <span class="mono-label reader-kind">{{ reading.kind }} · {{ reading.collection }}</span>
            <h2 class="reader-title">{{ reading.title }}</h2>
            <p class="mono-label reader-meta">{{ reading.meta }}</p>
          </header>

          <div class="reader-body">
            <p v-for="(p, i) in reading.body" :key="i">{{ p }}</p>
          </div>

          <footer class="reader-foot">
            <span class="mono-label">原文：{{ reading.file || '心辅站项目文稿' }}</span>
            <a
              v-if="reading.href"
              class="reader-dl mono-label"
              :href="reading.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              下载原件 <span aria-hidden="true">→</span>
            </a>
          </footer>
        </article>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { site } from '../data/content.js'

const { works } = site

const reading = ref(null)

const openDoc = (item, collection) => {
  reading.value = { ...item, collection: collection.label }
  document.body.style.overflow = 'hidden'
}

const closeDoc = () => {
  reading.value = null
  document.body.style.overflow = ''
}

const onKey = (e) => {
  if (e.key === 'Escape') closeDoc()
}

watch(reading, (v) => {
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.works {
  background-color: var(--color-cream-paper);
  border-top: 1px solid var(--color-whisper-gray);
}

.works-head {
  max-width: 680px;
  margin-bottom: var(--spacing-64);
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

/* ---------- 作品集分组 ---------- */
.collection + .collection {
  margin-top: var(--spacing-96);
  padding-top: var(--spacing-64);
  border-top: 1px solid var(--color-pencil-gray);
}

.collection-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-48);
  margin-bottom: var(--spacing-40);
}

.collection-heading {
  max-width: 640px;
}

.collection-index {
  display: block;
  color: var(--color-terracotta);
  margin-bottom: var(--spacing-8);
}

.collection-title {
  font-family: var(--font-inter);
  font-size: var(--text-subheading);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-8);
}

.collection-meta {
  display: block;
  color: var(--color-pencil-gray);
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

/* 二维码托盘 */
.qr-panel {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 132px;
  padding: 10px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-pencil-gray);
  background-color: #fff;
}

.qr-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
}

.qr-hint {
  color: var(--color-pencil-gray);
}

.qr-link {
  color: var(--color-forest-ink);
  text-align: center;
  line-height: 1.35;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--color-pencil-gray);
}

/* ---------- 作品卡片网格 ---------- */
.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-24);
}

.work-item {
  display: flex;
}

.work-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  text-align: left;
  overflow: hidden;
  border-radius: var(--radius-cards);
  border: 1px solid var(--color-forest-ink);
  background-color: var(--color-cream-paper);
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.work-card:hover {
  transform: translateY(-4px);
  background-color: #f8f5ee;
}

.work-cover {
  position: relative;
  display: block;
  aspect-ratio: 900 / 383;
  overflow: hidden;
  border-bottom: 1px solid var(--color-forest-ink);
  background-color: #ece7db;
}

.work-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.doc-hover {
  position: absolute;
  inset: auto 0 0 0;
  padding: 8px 12px;
  display: block;
  color: #fff;
  background-color: rgba(26, 51, 0, 0.82);
  transform: translateY(100%);
  transition: transform 0.22s ease;
}

.work-card:hover .doc-hover,
.work-card:focus-visible .doc-hover {
  transform: translateY(0);
}

/* 政务文稿的排版封面：没有实拍图，就仿一张公文的头 */
.doc-cover {
  background-color: #fff;
  background-image:
    linear-gradient(180deg, rgba(26, 51, 0, 0.035), rgba(26, 51, 0, 0) 62%),
    repeating-linear-gradient(180deg, transparent 0 16px, rgba(26, 51, 0, 0.09) 16px 17px);
  background-position:
    0 0,
    0 74px;
  background-repeat: no-repeat, repeat-y;
}

/* 红头横线 */
.doc-head {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  height: 2px;
  background-color: var(--color-terracotta);
}

.doc-head::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
  height: 1px;
  background-color: rgba(203, 85, 33, 0.3);
}

.doc-glyph {
  position: absolute;
  right: 26px;
  bottom: 12px;
  font-family: var(--font-display-cn);
  font-size: 88px;
  font-weight: var(--font-weight-extrabold);
  line-height: 1;
  color: rgba(26, 51, 0, 0.075);
}

.doc-kind {
  position: absolute;
  top: 34px;
  left: 20px;
  padding: 3px 9px;
  border-radius: var(--radius-tags);
  background-color: var(--color-forest-ink);
  color: var(--color-cream-paper);
}

.doc-ext {
  position: absolute;
  right: 20px;
  top: 34px;
  padding: 3px 8px;
  border-radius: var(--radius-tags);
  border: 1px solid var(--color-pencil-gray);
  color: var(--color-pencil-gray);
  background-color: rgba(255, 255, 255, 0.7);
}

.work-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: var(--spacing-16) var(--spacing-16) var(--spacing-24);
  flex-grow: 1;
}

.work-tag {
  color: var(--color-terracotta);
}

.work-title {
  font-family: var(--font-inter);
  font-size: 17px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.42;
  letter-spacing: -0.005em;
}

.work-quote {
  font-size: var(--text-caption);
  line-height: 1.62;
  color: #4a5a3a;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.work-from {
  margin-top: auto;
  padding-top: var(--spacing-8);
  color: var(--color-pencil-gray);
}

/* ---------- 阅读层 ---------- */
.reader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--spacing-40) var(--spacing-24);
  overflow-y: auto;
  background-color: rgba(26, 51, 0, 0.55);
}

.reader-card {
  position: relative;
  width: 100%;
  max-width: 720px;
  padding: var(--spacing-48);
  border-radius: var(--radius-2xl);
  background-color: var(--color-cream-paper);
  border: 1px solid var(--color-forest-ink);
}

.reader-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-pencil-gray);
  background-color: var(--color-cream-paper);
  color: var(--color-forest-ink);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.reader-close:hover {
  background-color: var(--color-whisper-gray);
}

.reader-kind {
  display: block;
  color: var(--color-terracotta);
  margin-bottom: var(--spacing-16);
}

.reader-title {
  font-family: var(--font-inter);
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
  line-height: 1.32;
}

.reader-meta {
  display: block;
  color: var(--color-pencil-gray);
  margin-top: var(--spacing-12, 12px);
}

.reader-body {
  margin-top: var(--spacing-32);
  padding-top: var(--spacing-32);
  border-top: 1px solid var(--color-pencil-gray);
}

.reader-body p {
  font-size: var(--text-body-sm);
  line-height: 1.85;
  color: #33422a;
}

.reader-body p + p {
  margin-top: var(--spacing-16);
}

.reader-foot {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-16);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-40);
  padding-top: var(--spacing-24);
  border-top: 1px solid var(--color-pencil-gray);
  color: var(--color-pencil-gray);
}

.reader-dl {
  color: var(--color-forest-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ---------- 视频作品 ---------- */
.video-block {
  margin-top: var(--spacing-96);
  padding-top: var(--spacing-64);
  border-top: 1px solid var(--color-pencil-gray);
}

.video-head {
  max-width: 640px;
  margin-bottom: var(--spacing-40);
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
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-8);
}

.video-note {
  font-size: var(--text-caption);
  line-height: 1.6;
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

.video-frame {
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-cards);
  border: 1px solid var(--color-forest-ink);
  background-color: #10180a;
  overflow: hidden;
}

.video-el {
  width: 100%;
  height: 100%;
  display: block;
  /* 竖版素材两侧补黑边，不做裁切 */
  object-fit: contain;
  background-color: #10180a;
}

/* 预留位：虚线框，明确表达「这里以后会有东西」 */
.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed var(--color-pencil-gray);
  border-radius: var(--radius-cards);
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

.video-caption {
  margin-top: var(--spacing-16);
  font-size: var(--text-body-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
}

.video-meta {
  margin-top: 6px;
  color: var(--color-pencil-gray);
}

/* ---------- 响应式 ---------- */
@media (max-width: 1024px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .collection-head {
    flex-direction: column;
    gap: var(--spacing-24);
  }
  .qr-panel {
    width: 168px;
  }
  .reader-card {
    padding: var(--spacing-32) var(--spacing-24);
  }
}

@media (max-width: 640px) {
  .work-grid,
  .video-grid {
    grid-template-columns: 1fr;
  }
  .work-title {
    font-size: 16px;
  }
}
</style>
