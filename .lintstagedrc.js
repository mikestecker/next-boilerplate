module.exports = {
  '*.{js,ts,tsx}': 'yarn run eslint',
  '*.{js,ts,tsx,css,md}': 'prettier --write',
  '*.{ts,tsx}': () => 'yarn run typecheck',
  '*.{ts,tsx}': ['eslint . --cache --fix --ext .tsx --ext .ts', () => 'yarn tsc'],
}
