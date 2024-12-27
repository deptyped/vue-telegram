import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-tg',
  description: 'Vue-Telegram Documentation',
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            noErrorTruncation: true,
            paths: {
              'vue-tg': [
                './dist',
              ],
              'vue-tg/7.8': [
                './dist/versions/7.8',
              ],
              'vue-tg/8.0': [
                './dist/versions/8.0',
              ],
              'vue-tg/latest': [
                './dist/versions/latest',
              ],
            },
          },
        },
      }),
    ],
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        _render(src, env, md) {
          if (env.relativePath.startsWith('mini-apps/components'))
            return ''
          if (env.relativePath.startsWith('mini-apps/composables'))
            return ''
          if (env.relativePath.startsWith('widgets/'))
            return ''

          return md.render(src, env)
        },
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Mini Apps',
        link: '/mini-apps',
      },
      {
        text: 'Widgets',
        link: '/widgets',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/deptyped/vue-telegram' },
    ],
  },
})
