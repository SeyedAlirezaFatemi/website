module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  quoteProps: 'consistent',
  endOfLine: 'auto',
  parser: 'typescript',
  importOrder: [
    'react',
    '^(?!react)\\w+$',
    '^(?!.*/).*$',
    '^[src/]',
    '^(..)',
    '^(.)',
  ],
  overrides: [
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['*.css'],
      options: {
        parser: 'css',
      },
    },
  ],
  tailwindConfig: './tailwind.config.js',
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-packagejson'),
  ],
};
