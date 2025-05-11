import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false);
  
  function init() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark';
    } else {
      isDarkMode.value = true;
    }
    
    applyTheme();
  }
  
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
  }
  
  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  return { isDarkMode, init, toggleTheme, applyTheme };
});