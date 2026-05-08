import type { I18nConfig } from 'next-i18next'

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'de', 'it'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  ns: ['translation', 'cart', 'checkout', 'product', 'home', 'tracking', 'wholesale', 'trust', 'nav'],
  resourceLoader: (language: string, namespace: string) => import(`./i18n/locales/${language}/${namespace}.json`),
}

export default i18nConfig