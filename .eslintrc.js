module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    // // Usa as regras recomendadas do @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Usa eslint-config-prettier para desabilitar regras ESLint de @typescript-eslint/eslint-plugin que entraria em conflito com Prettier
    'prettier/@typescript-eslint',

    // Ativa o eslint-plugin-prettier e exibe erros Prettier como erros ESLint. Certifique-se de que esta seja sempre a última configuração no array
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'off', // permitir console.log()
    'no-extra-semi': 'off', // permitir ponto-e-vírgula
    'no-redeclare': 'on', // não permitir redeclaração de variavel
    'no-self-assign': 'on' // não permitir atribuições em que ambos os lados sejam exatamente iguais
    'prettier/prettier': 'error',
  },
};
