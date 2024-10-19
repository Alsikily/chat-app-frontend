// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
      host: '0.0.0.0',
      port: 3000
  },

  css: [
      // Sass
      "~/scss/resets.scss",
      "~/scss/main.scss",
      // "~/scss/layout/buttons.scss",
      "~/scss/responsive.scss",
      // FontAwesome
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: [
      '@nuxtjs/color-mode',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
  ],

  pinia: {
      autoImports: [
          ['defineStore', 'definePiniaStore'],
      ],
  },

  plugins: [
      '~/plugins/fontawesome.js',
      '~/plugins/pusherConversation.ts'
  ],

  compatibilityDate: '2024-10-19'
})