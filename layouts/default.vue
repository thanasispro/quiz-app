<template>
  <div class="min-h-screen flex flex-col">
    <header class="px-6 py-4 md:px-16 lg:px-[140px] md:pt-10 md:pb-[49px] lg:pt-[83px] lg:pb-0 flex justify-between items-center">
      <div>
        <CategoryDisplay 
          v-if="currentCategory" 
          :text="currentCategory"
          :icon="getCategoryIcon(currentCategory)"
          :iconBackgroundColor="getCategoryColor(currentCategory)"
        />
      </div>
      <DarkModeSwitcher />
    </header>
    <main class="flex w-full px-6 pt-8 md:px-16 lg:px-[140px] md:pt-0 lg:pt-[85px]">
     <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import DarkModeSwitcher from '~/components/DarkModeSwitcher.vue';
import CategoryDisplay from '~/components/CategoryDisplay.vue';
import { useQuizStore } from '~/store/quizStore';
import { useCategories } from '~/composables/useCategories';

const route = useRoute();
const quizStore = useQuizStore();
const currentCategory = ref('');
const { formatCategoryName, getCategoryIcon, getCategoryColor } = useCategories();

// Function to extract category from route params or store
const updateCategory = () => {
  // First try to get category from quiz store
  if (quizStore.currentQuiz) {
    currentCategory.value = formatCategoryName(quizStore.currentQuiz);
    return;
  }
  
  // Then check route params
  const routeCategory = route.params.category;
  if (routeCategory) {
    if (Array.isArray(routeCategory)) {
      currentCategory.value = formatCategoryName(routeCategory[0]);
    } else {
      currentCategory.value = formatCategoryName(routeCategory);
    }
  } else {
    currentCategory.value = '';
  }
};

// Initial update
onMounted(() => {
  updateCategory();
});

// Watch for changes in route or store
watch(() => route.params.category, updateCategory);
watch(() => quizStore.currentQuiz, updateCategory);
</script>

<style scoped>
</style>
