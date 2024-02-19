import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-tg",
  description: "Vue-Telegram Documentation",
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      }
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Installation',
        link: "/installation",
      },
      {
        text: 'Mini Apps',
        link: "/mini-apps",
      },
      {
        text: 'Widgets',
        link: "/widgets",
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/deptyped/vue-telegram' }
    ]
  }
})
