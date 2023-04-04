# vite-plugin-i18n-tc2sc
Vite plugin of i18n tc2sc for Vue 3

## Install

Prerequisites: [vue-i18n](https://www.npmjs.com/package/vue-i18n) or [@nuxtjs/i18n-edge](https://www.npmjs.com/package/@nuxtjs/i18n-edge)

```
npm i vite-plugin-i18n-tc2sc
```

## Setup

### Nuxt
```ts
// nuxt.config.ts

import tc2scPlugin from 'vite-plugin-i18n-tc2sc'

export default defineNuxtConfig({
  vite: {
    plugins: [
      tc2scPlugin(())
    ]
  }
})
```

