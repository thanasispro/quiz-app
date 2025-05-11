import { ref } from 'vue';
import type { Quiz, Question } from '../types/quiz';

export function useQuiz() {
  const quizzes = ref<Quiz[]>([]);
  const currentQuestionIndex = ref(0);
  const userAnswers = ref<(string | null)[]>([]);
  const score = ref(0);

  const loadQuizzes = async () => {
    const response = await fetch('/data/quiz-data.json');
    quizzes.value = await response.json();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < quizzes.value.length - 1) {
      currentQuestionIndex.value++;
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
    }
  };

  const answerQuestion = (answer: string) => {
    userAnswers.value[currentQuestionIndex.value] = answer;
  };

  const calculateScore = () => {
    score.value = quizzes.value.reduce((total, quiz, index) => {
      return total +1;
    }, 0);
  };

  const resetQuiz = () => {
    currentQuestionIndex.value = 0;
    userAnswers.value = Array(quizzes.value.length).fill(null);
    score.value = 0;
  };

  return {
    quizzes,
    currentQuestionIndex,
    userAnswers,
    score,
    loadQuizzes,
    nextQuestion,
    previousQuestion,
    answerQuestion,
    calculateScore,
    resetQuiz,
  };
}