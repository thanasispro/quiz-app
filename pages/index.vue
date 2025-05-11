<script setup lang="ts">
import Button from '~/components/Button.vue';
import { useRouter } from 'vue-router';
import htmlIcon from '/assets/images/icon-html.svg';
import cssIcon from '/assets/images/icon-css.svg';
import jsIcon from '/assets/images/icon-js.svg';
import accessibilityIcon from '/assets/images/icon-accessibility.svg';

const router = useRouter();

const navigateToQuiz = (category: string) => {
  router.push(`/quiz/${category.toLowerCase()}`);
};

// Define colors for each category
const categoryColors = {
  html: '#FFF1E9', // orange-50
  css: '#E0FDEF', // green-1000
  javascript: '#EBF0FF', // blue-50
  accessibility: '#F6E7FF' // purple-100
};
</script>

<template>
  <!-- Skip to content link for keyboard users -->
  <a href="#category-selection" class="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-purple-500 focus:text-white focus:z-50">Skip to categories</a>
  
  <div class="flex flex-col lg:flex-row pt-8 md:pt-0 gap-10 md:gap-16 w-full">
    <!-- Title Section -->
    <header class="flex flex-col gap-4 w-full lg:w-1/2 lg:justify-start lg:items-start">
      <div class="flex flex-col gap-2 text-blue-900 dark:text-white">
        <h1 class="text-preset-2-light">Welcome to the</h1>
        <h1 class="text-preset-2-medium">Frontend Quiz!</h1>
      </div>
      <p class="text-preset-5 md:text-preset-6 text-grey-500 dark:text-blue-300">Pick a subject to get started.</p>
    </header>

    <!-- Category Buttons -->
    <section id="category-selection" class="flex flex-col gap-4 md:gap-6 lg:gap-4 w-full lg:w-1/2" aria-labelledby="category-heading">
      <h2 id="category-heading" class="sr-only">Quiz Categories</h2>
      <nav aria-label="Quiz Categories">
        <ul class="flex flex-col gap-4 md:gap-6 list-none p-0">
          <li>
            <Button 
              text="HTML" 
              :icon="htmlIcon" 
              :iconBackgroundColor="categoryColors.html"
              @click="navigateToQuiz('html')"
            />
          </li>
          <li>
            <Button 
              text="CSS" 
              :icon="cssIcon" 
              :iconBackgroundColor="categoryColors.css"
              @click="navigateToQuiz('css')"
            />
          </li>
          <li>
            <Button 
              text="JavaScript" 
              :icon="jsIcon" 
              :iconBackgroundColor="categoryColors.javascript"
              @click="navigateToQuiz('javascript')"
            />
          </li>
          <li>
            <Button 
              text="Accessibility" 
              :icon="accessibilityIcon" 
              :iconBackgroundColor="categoryColors.accessibility"
              @click="navigateToQuiz('accessibility')"
            />
          </li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<style scoped></style>