<template>
  <div class="results-container flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-32 w-full" aria-labelledby="results-heading">
    <!-- Left Section: Header with Quiz completion message -->
    <header class="flex flex-col gap-2 text-blue-900 dark:text-white w-full lg:w-1/2">
      <h1 id="results-heading" class="text-preset-2-light">Quiz Completed</h1>
      <p class="text-preset-2-medium">
        You scored...
      </p>
    </header>

    <!-- Right Section: Results and Play Again button -->
    <section class="flex flex-col items-center gap-4 md:gap-8 w-full lg:w-1/2" aria-labelledby="score-heading">
      <div class="flex flex-col items-center bg-white gap-4 dark:bg-blue-850 p-8 rounded-[12px] md:rounded-[24px] text-center shadow-sm w-full lg:p-12 lg:gap-10">
        <CategoryDisplay :text="formatCategoryName(quizStore.currentQuiz)" :icon="getCategoryIcon(quizStore.currentQuiz)"
          :iconBackgroundColor="getCategoryColor(quizStore.currentQuiz)" />
        <p class="text-preset-1 text-blue-900 dark:text-white" id="score-heading" aria-live="polite" aria-atomic="true">
          <span class="sr-only">Your score is </span>
          {{ quizStore.correctAnswersCount }}
          <span class="sr-only"> correct answers</span>
        </p>
        <p class="text-preset-4 md:text-preseet-5-medium lg:text-preset-5-regular text-grey-500 dark:text-blue-300">
          out of {{ quizStore.totalQuestions }}
        </p>
      </div>
      <div class="w-full">
        <ActionButton 
          text="Play Again"
          @click="goToHome"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useQuizStore } from '~/store/quizStore';
import { useCategories } from '~/composables/useCategories';
import ActionButton from '~/components/ActionButton.vue';

const router = useRouter();
const quizStore = useQuizStore();
const { formatCategoryName, getCategoryIcon, getCategoryColor } = useCategories();

// Redirect to home if no quiz results are available
if (quizStore.totalQuestions === 0) {
  router.push('/');
}

// Go back to home page
const goToHome = () => {
  quizStore.reset();
  router.push('/');
};
</script>