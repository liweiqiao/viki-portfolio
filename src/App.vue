<template>
  <SiteNav />

  <main id="top">
    <HeroSection />
    <AboutSection />
    <WorksSection />
    <ServicesSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>

<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import WorksSection from './components/WorksSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useReveal } from './composables/useReveal.js'

useReveal()
</script>
