import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Raw data modules must be read through the getters in data/index.ts.
 * Exception: data/client-safe.ts, a tiny Zod-free slice for client error boundaries.
 */
const dataGetterOnly = {
  group: [
    '@/data/*',
    '**/data/*',
    '!**/data/index',
    '!**/data/index.ts',
    '!@/data/client-safe',
    '!**/data/client-safe',
  ],
  message: 'Read content through the getters exported from "@/data" (data/index.ts).',
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next already registers the jsx-a11y plugin; we only raise
    // the rule set from "recommended" to "strict".
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
    },
  },
  {
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [dataGetterOnly] }],
    },
  },
  {
    // Presentational components stay data-agnostic and portable.
    files: ['components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/data', '@/data/*', '**/data', '**/data/*'],
              message: 'components/ui must not import from /data. Pass data in as props.',
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'next-env.d.ts',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.lighthouseci/**',
  ]),
]);
