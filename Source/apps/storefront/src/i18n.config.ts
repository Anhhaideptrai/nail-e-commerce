import type { I18nConfig } from 'next-i18next'

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'fr', 'de'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  ns: ['translation', 'footer', 'header'],
  resourceLoader: (language: string, namespace: string) => import(`./i18n/locales/${language}/${namespace}.json`),
}

export default i18nConfig
