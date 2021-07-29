module.exports = {
  /** Inclue ponto-e-vírgula no final das declarações */
  semi: true,

  /** Vírgulas à direita sempre que possível quando houver várias linhas */
  trailingComma: 'all',

  /** Define se o Prettier deve usar aspas simples no código,
   * ao definir como true,
   * o Prettier substituirá qualquer aspa dupla por simples */
  singleQuote: true,

  /** Define o comprimento máximo de cada linha para 80 caracteres,
   * ou seja, se alguma exceder esse limite,
   * o Prettier realiza a quebra automática */
  printWidth: 80,

  /** Inclue parênteses em torno de um único parâmetro de arrow function
   * Exemplo:(x) => x */
  arrowParens: 'always',

  /** Especifica o número de espaços do recuo que normalmente são 4 ou 2 */
  tabWidth: 2,
};

// yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
// yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin