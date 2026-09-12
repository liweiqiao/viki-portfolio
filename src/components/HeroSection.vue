<template>
  <section class="hero">
    <!-- 手绘线条装饰：forest ink 低透明度，做气氛不做信息 -->
    <svg class="sketch sketch-spiral" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M60 22c-9 0-16 7-16 16s7 16 16 16 16-7 16-16-7-16-16-16zm0 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path d="M60 8v14M60 82v14M8 60h14M82 60h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>

    <svg class="sketch sketch-star" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M50 10v80M18 30l64 40M82 30L18 70"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>

    <svg class="sketch sketch-wave" viewBox="0 0 260 60" fill="none" aria-hidden="true">
      <path
        d="M6 34c22-26 40 22 62-2s40 22 62-2 40 22 62-2 42 20 62-2"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>

    <div class="container hero-inner">
      <!-- 眉标徽章 -->
      <span class="eyebrow reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8L12 3z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
        </svg>
        {{ hero.eyebrow }}
      </span>

      <!-- 展示级标题，第二行荧光笔涂抹 -->
      <h1 class="display-cn hero-title reveal">
        <span class="line">{{ hero.headlineTop }}</span>
        <span class="line"><span class="hl">{{ hero.headlineHighlight }}</span></span>
      </h1>

      <p class="lede hero-lede reveal">{{ hero.lede }}</p>

      <div class="hero-cta reveal">
        <a class="btn btn-primary" :href="hero.primaryCta.href">
          <span class="arrow" aria-hidden="true">→</span>{{ hero.primaryCta.label }}
        </a>
        <a class="btn btn-ghost" :href="hero.secondaryCta.href">{{ hero.secondaryCta.label }}</a>
      </div>

      <p class="hero-reassure reveal">{{ hero.reassure }}</p>

      <!-- 发布平台条 -->
      <div class="hero-platforms reveal">
        <span class="platforms-label">{{ hero.platformsLabel }}</span>
        <ul class="platforms">
          <li v-for="p in hero.platforms" :key="p">{{ p }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/content.js'

const { hero } = site
</script>

<style scoped>
.hero {
  position: relative;
  padding: 210px 0 120px;
  overflow: hidden;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-24);
}

/* ---------- 装饰定位 ---------- */
.sketch-spiral {
  top: 150px;
  left: 4%;
  width: 110px;
}

.sketch-star {
  top: 260px;
  right: 6%;
  width: 78px;
}

.sketch-wave {
  bottom: 24px;
  left: 50%;
  width: 260px;
  transform: translateX(-50%);
}

/* ---------- 标题 ---------- */
.hero-title {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-8);
  font-size: var(--text-display);
}

.hero-title .line {
  display: block;
}

.hero-lede {
  margin-top: var(--spacing-8);
  max-width: 600px;
  color: var(--color-forest-ink);
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-16);
  margin-top: var(--spacing-16);
}

.hero-reassure {
  font-size: var(--text-caption);
  color: var(--color-pencil-gray);
}

/* ---------- 平台条 ---------- */
.hero-platforms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-24);
  margin-top: var(--spacing-24);
  padding-top: var(--spacing-32);
  border-top: 1px solid var(--color-whisper-gray);
}

.platforms-label {
  font-size: 12px;
  color: var(--color-pencil-gray);
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-24);
}

.platforms li {
  font-size: var(--text-caption);
  font-weight: var(--font-weight-medium);
  color: var(--color-forest-ink);
  opacity: 0.55;
}

@media (max-width: 1024px) {
  .hero {
    padding: 180px 0 96px;
  }
  .sketch-spiral,
  .sketch-star {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 150px 0 72px;
  }
  .hero-platforms {
    gap: var(--spacing-16);
  }
  .platforms {
    gap: var(--spacing-16);
  }
  .sketch-wave {
    width: 180px;
    bottom: 8px;
  }
}
</style>
