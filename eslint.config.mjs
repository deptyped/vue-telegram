import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/valid-template-root': 'off',
    'vue/require-component-is': 'off',
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
  },
  ignores: [
    'docs/**/*',
  ],
})
