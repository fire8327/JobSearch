// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@formkit/nuxt'
  ],
  postcss: {
    plugins: {
      cssnano: false 
    }
  },

  supabase: {
    redirect: false
  }
})