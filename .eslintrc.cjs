module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Agregado para TypeScript
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:prettier/recommended' // Asegúrate de que prettier sea el último
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/'],
  parser: '@typescript-eslint/parser', // Parser para TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'], // Indicar a ESLint dónde están tus tsconfig
    tsconfigRootDir: __dirname, // Raíz del proyecto
  },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      typescript: {} // Permite a ESLint resolver importaciones TypeScript
    }
  },
  plugins: ['react-refresh', 'jsx-a11y', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Deshabilita prop-types ya que usas TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Advertir sobre variables no usadas
    '@typescript-eslint/no-explicit-any': 'off', // Puedes habilitar/deshabilitar esto
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
    'prettier/prettier': 'error',
  },
};