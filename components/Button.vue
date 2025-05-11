<template>
  <button 
    :class="[
      'flex flex-row items-center w-full p-4 lg:p-6 gap-4 md:gap-8 rounded-[12px] md:rounded-[24px] transition-colors border-2 bg-white dark:bg-blue-850',
      {
        'border-green-500': isCorrect,
        'border-red-500': isIncorrect,
        'border-purple-600': isSelected && !isCorrect && !isIncorrect,
        'border-transparent': !isSelected && !isCorrect && !isIncorrect
      }
    ]"
    @click="$emit('click')"
    :disabled="disabled"
    :aria-pressed="isSelected"
    :aria-disabled="disabled"
    :aria-describedby="isCorrect ? `correct-answer-${_uid}` : (isIncorrect ? `incorrect-answer-${_uid}` : undefined)"
    role="button"
    :tabindex="disabled ? '-1' : '0'"
    @keyup.enter="$emit('click')"
    @keyup.space="$emit('click')"
  >
    <div v-if="icon" class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center p-2 rounded-[12px] text-blue-900 dark:text-white" :style="{ backgroundColor: iconBackgroundColor }">
      <img :src="icon" :alt="`${text} icon`" class="max-w-full max-h-full" />
    </div>
    <div v-else-if="letter" class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-preset-4 text-grey-500 rounded-[12px]" 
      :class="{
        'bg-gray-50': !isCorrect && !isIncorrect && !isSelected,
        'bg-green-500 text-white dark:text-blue-850': isCorrect,
        'bg-red-500 text-white dark:text-blue-850': isIncorrect,
        'bg-purple-600 text-white dark:text-blue-850': isSelected && !isCorrect && !isIncorrect
      }">
      {{ letter }}
    </div>
    <span class="flex-1 text-left text-preset-4 text-blue-900 dark:text-white">{{ text }}</span>
    
    <!-- Correct/Incorrect icons -->
    <div v-if="isCorrect" class="w-8 h-8 md:w-10 md:h-10">
      <img src="/assets/images/icon-correct.svg" alt="Correct" />
    </div>
    <div v-if="isIncorrect" class="w-8 h-8 md:w-10 md:h-10">
      <img src="/assets/images/icon-incorrect.svg" alt="Incorrect" />
    </div>

    <!-- Screen reader text - moved inside the button -->
    <span v-if="isCorrect" :id="`correct-answer-${_uid}`" class="sr-only">This is the correct answer</span>
    <span v-if="isIncorrect" :id="`incorrect-answer-${_uid}`" class="sr-only">This is an incorrect answer</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    letter: {
      type: String,
      validator: value => ['A', 'B', 'C', 'D'].includes(value),
      default: null
    },
    iconBackgroundColor: {
      type: String,
      default: '#f0f0f0'
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    isIncorrect: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>