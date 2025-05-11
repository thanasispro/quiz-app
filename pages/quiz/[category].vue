<template>
  <main class="quiz-container p-4 md:p-0 w-full">
    <!-- Skip to content link for keyboard users -->
    <a href="#answer-options" class="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-purple-500 focus:text-white focus:z-50">Skip to answer options</a>
    
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-64" role="status" aria-live="polite">
      <p>Loading questions...</p>
    </div>
    
    <!-- Quiz content -->
    <section v-else-if="currentQuestion" class="flex flex-col lg:flex-row lg:gap-[128px] w-full" aria-labelledby="quiz-heading">
      <h1 id="quiz-heading" class="sr-only">{{ category }} Quiz</h1>
      
      <!-- Question Section - Left Side -->
      <section class="flex flex-col w-full lg:w-1/2" aria-labelledby="current-question">
        <!-- Question index -->
        <p class="text-preset-5 text-grey-500 dark:text-blue-300 md:text-preset-6 mb-4 md:mb-6" aria-live="polite">
          Question {{ quizStore.currentQuestionIndex + 1 }} of {{ quizStore.totalQuestions }}
        </p>

        <!-- Question text -->
        <h2 id="current-question" class="text-preset-3 text-blue-900 dark:text-white mb-6 md:mb-10 lg:mb-[184px]">{{ currentQuestion.question }}</h2>

        <!-- Progress bar -->
        <div class="w-full h-4 bg-white dark:bg-blue-850 rounded-full flex items-center p-1" 
             role="progressbar"
             :aria-valuenow="Math.round((quizStore.currentQuestionIndex / quizStore.totalQuestions) * 100)"
             aria-valuemin="0"
             aria-valuemax="100"
             :aria-label="`Question ${quizStore.currentQuestionIndex + 1} of ${quizStore.totalQuestions}`">
          <div class="h-2 bg-purple-500 rounded-full"
               :style="{ width: `${(quizStore.currentQuestionIndex / quizStore.totalQuestions) * 100}%` }"></div>
        </div>
      </section>

      <!-- Answer options - Right Side -->
      <section id="answer-options" class="flex flex-col gap-3 md:gap-6 lg:gap-4 mt-4 lg:mt-0 w-full lg:w-1/2" 
               role="region" 
               aria-labelledby="options-heading">
        <h3 id="options-heading" class="sr-only">Answer options</h3>
        <div role="radiogroup" aria-labelledby="options-heading">
          <Button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index" 
            :text="option"
            :letter="['A', 'B', 'C', 'D'][index]" 
            :is-selected="selectedOption === option"
            :is-correct="showFeedback && option === correctAnswer"
            :is-incorrect="showFeedback && option === selectedOption && selectedOption !== correctAnswer"
            :disabled="showFeedback"
            @click="selectOption(option)" 
            role="radio"
            :aria-checked="selectedOption === option"
          />
        </div>
        
        <div class="md:mt-4 lg:mt-8">
          <!-- Submit Answer / Next Question Button -->
          <ActionButton 
            v-if="!showFeedback"
            text="Submit Answer"
            @click="handleSubmit"
          />
          
          <ActionButton 
            v-else
            text="Next Question"
            :isNextQuestion="true"
            @click="nextQuestion"
          />
        </div>

        <!-- Error message if nothing selected -->
        <div v-if="!showFeedback && showSelectionError" 
             class="flex items-center justify-center gap-2 text-red-500 dark:text-white text-preset-5 my-2"
             role="alert"
             aria-live="assertive">
          <img src="/assets/images/icon-error.svg" alt="Error" class="w-5 h-5" />
          <span>Please select an answer</span>
        </div>
      </section>
      
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuizStore } from '~/store/quizStore';
import ActionButton from '~/components/ActionButton.vue';

const route = useRoute();
const router = useRouter();
const quizStore = useQuizStore();

const category = ref(route.params.category);
const currentQuestion = ref(null);
const selectedOption = ref(null);
const loading = ref(true);
const error = ref(null);
const showFeedback = ref(false);
const isAnswerCorrect = ref(false);
const correctAnswer = ref('');
const showSelectionError = ref(false);

// Initialize quiz
const initializeQuiz = async () => {
  try {
    loading.value = true;

    // Initialize the quiz in the store
    quizStore.startQuiz(category.value);

    // Load first question (which will also set the total questions from API)
    await loadCurrentQuestion();

    loading.value = false;
  } catch (err) {
    error.value = 'Failed to initialize quiz. Please try again.';
    loading.value = false;
    console.error(err);
  }
};

// Load current question based on the index
const loadCurrentQuestion = async () => {
  if (quizStore.isCompleted) return;

  try {
    loading.value = true;

    // Fetch the question for the current index
    const response = await $fetch(`/api/quizzes/${category.value}/questions/${quizStore.currentQuestionIndex}`);

    // Update the current question from the nested structure
    currentQuestion.value = {
      ...response.question,
      correctAnswer: response.question.answer
    };

    // Update total questions from the API response
    if (quizStore.totalQuestions === 0) {
      quizStore.setTotalQuestions(response.totalQuestions);
    }

    loading.value = false;
  } catch (err) {
    error.value = `Failed to load question ${quizStore.currentQuestionIndex + 1}. Please try again.`;
    loading.value = false;
    console.error(err);
  }
};

// Select an answer option
const selectOption = (option) => {
  selectedOption.value = option;
};

// Handler for submit button click
const handleSubmit = () => {
  if (!selectedOption.value) {
    // Show error message if no option selected
    showSelectionError.value = true;
    // Hide error message after 3 seconds
    setTimeout(() => {
      showSelectionError.value = false;
    }, 3000);
    return;
  }
  
  // If an option is selected, hide any error and proceed with submission
  showSelectionError.value = false;
  submitAnswer();
};

// Submit the current answer
const submitAnswer = async () => {
  if (!selectedOption.value) return;

  try {
    loading.value = true;
    
    // Call API to check if the answer is correct
    const response = await $fetch(`/api/quizzes/${category.value}/questions/${quizStore.currentQuestionIndex}/check`, {
      method: 'POST',
      body: {
        answer: selectedOption.value
      }
    });
    
    // Save answer to the store
    quizStore.saveAnswer(
      quizStore.currentQuestionIndex,
      selectedOption.value,
      response.correctAnswer
    );
    
    // Show feedback on answer (correct/incorrect)
    showFeedback.value = true;
    isAnswerCorrect.value = response.isCorrect;
    correctAnswer.value = response.correctAnswer;
    loading.value = false;
    
  } catch (err) {
    error.value = 'Failed to submit answer. Please try again.';
    loading.value = false;
    console.error(err);
  }
};

// Go to next question or results page
const nextQuestion = () => {
  // Check if this was the last question
  const isLastQuestion = quizStore.currentQuestionIndex === quizStore.totalQuestions - 1;
  
  // Advance to next question
  quizStore.nextQuestion();
  
  // If that was the last question, go to results page
  if (isLastQuestion) {
    router.push('/quiz/results');
  } else {
    // Reset for next question
    selectedOption.value = null;
    showFeedback.value = false;
  }
};

const goToHome = () => {
  quizStore.reset();
  router.push('/');
};

// Watch for changes in the current question index
watch(() => quizStore.currentQuestionIndex, (newIndex, oldIndex) => {
  if (newIndex !== oldIndex && !quizStore.isCompleted) {
    loadCurrentQuestion();
  }
});

// Initialize the quiz when component mounts
onMounted(() => {
  initializeQuiz();
});
</script>