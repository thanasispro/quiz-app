// filepath: /Users/thanasisprotopapas/frm/quiz-app/server/api/quizzes/[title]/questions/[index]/check.ts
import { defineEventHandler, createError, readBody } from 'h3';
import data from '../../../../../data';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

interface DataStructure {
  quizzes: Quiz[];
}

export default defineEventHandler(async (event) => {
  try {
    // Get the title and index parameters from the URL
    const title = event.context.params?.title;
    const index = event.context.params?.index;
    
    if (!title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Quiz title is required'
      });
    }
    
    if (!index || isNaN(parseInt(index))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid question index is required'
      });
    }

    // Get submitted answer from request body
    const body = await readBody(event);
    const submittedAnswer = body?.answer;
    
    const questionIndex = parseInt(index);
    
    // Use the imported data directly
    
    // Find the quiz with the matching title (case-insensitive)
    const quiz = data.quizzes.find(q => 
      q.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
    );
    
    // If no quiz is found, return a 404 error
    if (!quiz) {
      throw createError({
        statusCode: 404,
        statusMessage: `Quiz with title '${title}' not found`
      });
    }
    
    // Check if the question index is valid
    if (questionIndex < 0 || questionIndex >= quiz.questions.length) {
      throw createError({
        statusCode: 404,
        statusMessage: `Question index ${questionIndex} not found in quiz '${title}'`
      });
    }
    
    // Get the correct answer
    const correctAnswer = quiz.questions[questionIndex].answer;
    
    // Return the correct answer and whether the submitted answer is correct
    return {
      correctAnswer,
      isCorrect: submittedAnswer === correctAnswer,
      questionIndex
    };
  } catch (error: unknown) {
    console.error('Error checking answer:', error);
    const errorObject = error as { statusCode?: number; statusMessage?: string };
    throw createError({
      statusCode: errorObject.statusCode || 500,
      statusMessage: errorObject.statusMessage || 'Failed to check answer'
    });
  }
});
