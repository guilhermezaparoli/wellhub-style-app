import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';


export default defineConfig([
  globalIgnores(['./build']),
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-return-await': 'error',
      'require-await': 'off',
      'quotes': ['error', 'single'],
      
    },
  },
]);
