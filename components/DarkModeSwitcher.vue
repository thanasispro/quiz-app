<template>
  <div class="flex flex-row items-center gap-2 md:gap-3">
    <img 
      :src="sunIcon" 
      alt="Light mode"
      class="w-4 h-4 md:w-6 md:h-6"
    />
    
    <button 
      @click="themeStore.toggleTheme"
      class="relative w-[33px] h-5 md:w-12 md:h-7 rounded-full p-1 transition-colors duration-300 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
      :aria-label="themeStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-checked="themeStore.isDarkMode"
      role="switch"
    >
      <div 
        class="w-3 h-3 md:w-5 md:h-5 bg-white rounded-full transform transition-transform duration-300"
        :class="themeStore.isDarkMode ? 'translate-x-3 md:translate-x-[20px]' : 'translate-x-0'"
      ></div>
      <span class="sr-only">{{ themeStore.isDarkMode ? 'Currently in dark mode' : 'Currently in light mode' }}</span>
    </button>
    
    <img 
      :src="moonIcon" 
      alt="Dark mode"
      class="w-4 h-4 md:w-6 md:h-6"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useThemeStore } from '../store/themeStore';

// Import all icon variants
import sunDark from '/assets/images/icon-sun-dark.svg';
import sunLight from '/assets/images/icon-sun-light.svg';
import moonDark from '/assets/images/icon-moon-dark.svg';
import moonLight from '/assets/images/icon-moon-light.svg';

const themeStore = useThemeStore();

const sunIcon = computed(() => {
  return themeStore.isDarkMode ? sunLight : sunDark;
});

const moonIcon = computed(() => {
  return themeStore.isDarkMode ? moonLight : moonDark;
});

onMounted(() => {
  themeStore.init();
});
</script>