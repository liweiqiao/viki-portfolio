<template>
  <header class="nav-wrap">
    <nav class="nav">
      <!-- Logo Mark：40×40 黄色方块 + 手写感 monogram + Inter 700 wordmark -->
      <a class="logo" href="#top" aria-label="回到顶部">
        <span class="logo-mark" aria-hidden="true">{{ brand.monogram }}</span>
        <span class="logo-word">{{ brand.name }}</span>
      </a>

      <ul class="nav-links">
        <li v-for="item in nav" :key="item.href">
          <a :href="item.href">{{ item.label }}</a>
        </li>
      </ul>

      <div class="nav-actions">
        <a class="btn btn-outline" href="#contact">聊聊合作</a>
        <a class="btn btn-primary btn-sm" href="#works">
          <span class="arrow" aria-hidden="true">→</span>看作品
        </a>
      </div>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="String(open)"
        aria-controls="mobile-menu"
        aria-label="打开导航菜单"
        @click="open = !open"
      >
        <span :class="['bar', { 'bar-open': open }]" />
        <span :class="['bar', { 'bar-open-2': open }]" />
      </button>
    </nav>

    <transition name="drop">
      <div v-if="open" id="mobile-menu" class="nav-panel">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="panel-link"
          @click="open = false"
        >
          {{ item.label }}
        </a>
        <a class="btn btn-primary btn-sm panel-cta" href="#contact" @click="open = false">
          <span class="arrow" aria-hidden="true">→</span>聊聊合作
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { site } from '../data/content.js'

const { brand, nav } = site
const open = ref(false)
</script>

<style scoped>
/* 悬浮胶囊导航：顶部居中，不占满整宽 */
.nav-wrap {
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 var(--spacing-24);
}

.nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 10px 12px 10px 16px;
  background-color: var(--color-cream-paper);
  border: 1px solid var(--color-pencil-gray);
  border-radius: var(--radius-nav);
  /* DESIGN.md 指定的多层黄色光晕，越出导航边缘 */
  box-shadow: var(--shadow-xl);
}

/* ---------- Logo ---------- */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: var(--color-highlighter-yellow);
  font-family: var(--font-display-cn);
  font-size: 21px;
  font-weight: 900;
  line-height: 1;
  color: var(--color-forest-ink);
  /* 轻微旋转模拟手绘 monogram 的不完美 */
  transform: rotate(-5deg);
}

.logo-word {
  font-family: var(--font-inter);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.01em;
  color: var(--color-forest-ink);
  white-space: nowrap;
}

/* ---------- 中间导航 ---------- */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-32);
}

.nav-links a {
  position: relative;
  font-size: var(--text-caption);
  font-weight: var(--font-weight-medium);
  color: var(--color-forest-ink);
  padding: 4px 0;
}

/* 下划线用荧光笔黄色，呼应 marker 语义 */
.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  background-color: var(--color-highlighter-yellow);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;
}

.nav-links a:hover::after {
  opacity: 1;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* ---------- 移动端汉堡 ---------- */
.nav-toggle {
  display: none;
  width: 42px;
  height: 42px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-pencil-gray);
}

.bar {
  display: block;
  width: 18px;
  height: 2px;
  background-color: var(--color-forest-ink);
  transition: transform 0.22s ease;
}

.bar-open {
  transform: translateY(3.5px) rotate(45deg);
}

.bar-open-2 {
  transform: translateY(-3.5px) rotate(-45deg);
}

/* ---------- 移动端面板 ---------- */
.nav-panel {
  display: none;
  flex-direction: column;
  gap: 4px;
  max-width: var(--page-max-width);
  margin: 10px auto 0;
  padding: 12px;
  background-color: var(--color-cream-paper);
  border: 1px solid var(--color-pencil-gray);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-subtle-2);
}

.panel-link {
  padding: 14px 16px;
  border-radius: var(--radius-md);
  font-size: var(--text-body-sm);
  font-weight: var(--font-weight-medium);
}

.panel-link:hover {
  background-color: var(--color-sticky-note-mint);
}

.panel-cta {
  margin-top: 8px;
  justify-content: center;
}

.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1040px) {
  .logo-word {
    display: none;
  }
}

@media (max-width: 900px) {
  .nav-links,
  .nav-actions {
    display: none;
  }
  .nav-toggle {
    display: flex;
  }
  .nav-panel {
    display: flex;
  }
}

@media (max-width: 480px) {
  .nav-wrap {
    padding: 0 var(--spacing-16);
  }
}
</style>
