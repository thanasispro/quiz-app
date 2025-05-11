import { defineStore } from 'pinia';

interface Answer {
  questionIndex: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizState {
  currentQuiz: string;
  answers: Answer[];
  totalQuestions: number;
  currentQuestionIndex: number;
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    currentQuiz: '',
    answers: [],
    totalQuestions: 0,
    currentQuestionIndex: 0
  }),

  getters: {
    correctAnswersCount: (state) => 
      state.answers.filter(answer => answer.isCorrect).length,
      
    score: (state) => {
      const correct = state.answers.filter(answer => answer.isCorrect).length;
      return state.totalQuestions > 0 ? 
        Math.round((correct / state.totalQuestions) * 100) : 0;
    },
    
    isCompleted: (state) => 
      state.currentQuestionIndex >= state.totalQuestions && state.totalQuestions > 0
  },

  actions: {
    startQuiz(category: string) {
      this.currentQuiz = category;
      this.answers = [];
      this.currentQuestionIndex = 0;
    },
    
    setTotalQuestions(total: number) {
      this.totalQuestions = total;
    },
    
    saveAnswer(questionIndex: number, selectedAnswer: string, correctAnswer: string) {
      const isCorrect = selectedAnswer === correctAnswer;
      
      // Check if already answered, if so, update
      const existingIndex = this.answers.findIndex(a => a.questionIndex === questionIndex);
      
      if (existingIndex >= 0) {
        this.answers[existingIndex] = { 
          questionIndex, 
          selectedAnswer, 
          correctAnswer, 
          isCorrect 
        };
      } else {
        this.answers.push({ 
          questionIndex, 
          selectedAnswer, 
          correctAnswer, 
          isCorrect 
        });
      }
    },
    
    nextQuestion() {
      // Only move to next question when explicitly called
      this.currentQuestionIndex++;
    },
    
    reset() {
      this.currentQuiz = '';
      this.answers = [];
      this.totalQuestions = 0;
      this.currentQuestionIndex = 0;
    }
  }
});
