<template>
  <button 
    class="w-full bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 hover:opacity-50 text-white py-[19px] md:py-8 text-preset-4 rounded-[12px] md:rounded-[24px] focus:outline-none focus:ring-2 focus:ring-purple-300"
    @click="$emit('click')"
    :aria-label="text"
    role="button"
    tabindex="0"
    @keyup.enter="$emit('click')"
    @keyup.space="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      required: true
    },
    isNextQuestion: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>
