import { useState } from 'react';
import { getT } from 'next-i18next/server';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export async function LanguageSwitcher() {
  const {  i18n } = await getT();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-xs text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors uppercase tracking-wider"
        style={{ letterSpacing: '0.1em' }}
      >
        <Globe className="size-4" />
        <span className="hidden md:inline">{currentLanguage.flag}</span>
        <span className="hidden lg:inline">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-white border border-[#E0E0E0] shadow-lg z-50 min-w-[160px]">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F5F5F5] transition-colors ${
                  lang.code === i18n.language ? 'bg-[#F5F5F5] text-[#1A1A1A]' : 'text-[#5A5A5A]'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
