<template>
  <section 
    class="flex flex-row items-center gap-4 rounded-lg"
    role="region"
    :aria-label="`${text} category`"
  >
    <div v-if="icon" class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center p-2 rounded-[6px] text-blue-900 dark:text-white" :style="{ backgroundColor: iconBackgroundColor }">
      <img :src="icon" :alt="`${text} icon`" class="max-w-full max-h-full" />
    </div>
    <h3 class="text-preset-4 text-blue-900 dark:text-white">{{ text }}</h3>
  </section>
</template>

<script>
export default {
  name: 'CategoryDisplay',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    iconBackgroundColor: {
      type: String,
      default: 'transparent'
    }
  }
}
</script>
