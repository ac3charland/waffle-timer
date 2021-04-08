module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    overrides: [
        {
            files: ['*.spec.js', '*.test.jsx'],
            globals: {
                mount: 'readonly',
                shallow: 'readonly',
                cy: 'readonly',
                context: 'readonly'
            },
            rules: {
                'react/react-in-jsx-scope': 'off'
            }
        },
        {
            files: ['*.spec.js'],
            rules: {
                'jest/expect-expect': 'off'
            }
        }
    ],
    plugins: [
        'react'
    ],
    settings: {
        react: {
            version: '16'
        }
    },
    rules: {
        'array-bracket-spacing': ['error', 'never'],
        'arrow-spacing': ['error', {before: true, after: true}],
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never'
        }],
        'jsx-quotes': ['error', 'prefer-single'],
        'key-spacing': 'error',
        'no-console': ['error', {allow: ['warn', 'error']}],
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        'no-unused-vars': ['error', {args: 'none'}],
        'object-curly-spacing': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
        'react/no-unescaped-entities': 'off',
        semi: ['error', 'never'],
        'space-before-function-paren': ['error', {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
        'space-infix-ops': ['error', {int32Hint: false}],
        'spaced-comment': ['error', 'always'],
        'eol-last': ['error', 'always']
    }
}
