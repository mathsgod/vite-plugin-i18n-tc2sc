# vite-plugin-i18n-tc2sc

[![npm version](https://img.shields.io/npm/v/vite-plugin-i18n-tc2sc)](https://www.npmjs.com/package/vite-plugin-i18n-tc2sc)
[![license](https://img.shields.io/npm/l/vite-plugin-i18n-tc2sc)](https://github.com/mathsgod/vite-plugin-i18n-tc2sc/blob/main/LICENSE)

一個 Vite 插件，用於在 Vue 3 的 `vue-i18n` `<i18n>` 區塊中，自動將繁體中文（`tc`）轉換為簡體中文（`sc`），無需手動維護兩套翻譯檔。

## 功能特點

- 🔄 自動從繁體中文生成簡體中文翻譯
- 📦 支援 JSON 與 YAML 格式的 `<i18n>` 區塊
- ✏️ 支援手動覆寫：可在 `sc` 中指定個別翻譯來覆蓋自動轉換的結果
- 🚀 適用於 Vue 3 + vue-i18n 及 Nuxt 3 專案
- ⚡ 作為 Vite `pre` enforce 插件，於建構階段自動處理

## 安裝

前置條件：[vue-i18n](https://www.npmjs.com/package/vue-i18n) 或 [@nuxtjs/i18n](https://www.npmjs.com/package/@nuxtjs/i18n)

```bash
npm install vite-plugin-i18n-tc2sc
```

## 設定

### Vite (Vue 3)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tc2scPlugin from 'vite-plugin-i18n-tc2sc'

export default defineConfig({
  plugins: [
    vue(),
    tc2scPlugin()
  ]
})
```

### Nuxt 3

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

## 使用方式

在 Vue 元件的 `<i18n>` 區塊中，只需撰寫繁體中文的翻譯（`tc`），插件會自動生成對應的簡體中文（`sc`）。

### JSON 格式

```vue
<i18n lang="json">
{
  "tc": {
    "hello": "你好嗎？",
    "welcome": "歡迎光臨"
  }
}
</i18n>

<template>
  <div>
    <h1>{{ t('hello') }}</h1>
    <p>{{ t('welcome') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
```

當 locale 設為 `sc` 時，將自動輸出：
- `你好嗎？` → `你好吗？`
- `歡迎光臨` → `欢迎光临`

### YAML 格式

```vue
<i18n lang="yaml">
tc:
  hello: 你好嗎？
  welcome: 歡迎光臨
</i18n>
```

### 手動覆寫

如果自動轉換的結果不符合預期，可以在 `sc` 中手動指定翻譯，手動值會覆蓋自動轉換的結果：

```vue
<i18n lang="json">
{
  "tc": {
    "memory": "記憶體",
    "program": "程式"
  },
  "sc": {
    "memory": "内存",
    "program": "程序"
  }
}
</i18n>
```

在此範例中，`sc` 的值會直接使用手動指定的 `"内存"` 和 `"程序"`，而非自動轉換的結果。

### 巢狀結構

支援巢狀的翻譯物件：

```vue
<i18n lang="json">
{
  "tc": {
    "nav": {
      "home": "首頁",
      "about": "關於我們"
    }
  }
}
</i18n>
```

會自動生成：

```json
{
  "sc": {
    "nav": {
      "home": "首页",
      "about": "关于我们"
    }
  }
}
```

## 運作原理

1. 插件會攔截所有 Vue SFC 中的 `<i18n>` 區塊（支援 JSON 與 YAML）
2. 若偵測到 `tc`（繁體中文）鍵值，則自動逐字將繁體轉為簡體
3. 如果已存在手動定義的 `sc` 翻譯，會以手動值覆蓋自動轉換結果
4. 轉換後的結果會作為 `sc` 鍵值寫回 i18n 區塊

## 授權

[MIT](./LICENSE)
