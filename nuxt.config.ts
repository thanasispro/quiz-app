// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
  },
  nitro: {
    preset: 'node-server',
    output: {
      dir: './dist'
    }
  }
})
