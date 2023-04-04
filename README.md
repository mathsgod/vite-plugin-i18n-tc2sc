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
      tc2scPlugin()
    ]
  }
})
```

## Example

In some vue page
```vue
<i18n lang="json">
{
  "tc": {
    "hello": "你好嗎?"
  }
}
</i18n>

<template>
  <div>
    <h1>{{ $t('hello') }}</h1>
  </div>
</template>
```

It will be converted to "你好吗?" when locale is "sc"
