'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const currentLocale =
    pathname.split('/')[1] || 'en';

  const currentLanguage =
    languages.find(
      (lang) => lang.code === currentLocale
    ) || languages[0];

  const handleLanguageChange = (
    locale: string
  ) => {
    setIsOpen(false);

    const segments = pathname.split('/');

    if (
      languages.some(
        (lang) => lang.code === segments[1]
      )
    ) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    router.push(segments.join('/'));
  };

  return (
    <div className="relative">
      <button
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#5A5A5A] transition-colors hover:text-[#1A1A1A]"
      >
        <Globe className="size-4" />

        <span className="hidden lg:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <>
          <button
            aria-label="Close language menu"
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-md border border-[#E5E5E5] bg-white shadow-lg">
            {languages.map((lang) => {
              const active =
                lang.code === currentLocale;

              return (
                <button
                  key={lang.code}
                  onClick={() =>
                    handleLanguageChange(
                      lang.code
                    )
                  }
                  className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[#F5F5F5] ${active
                    ? 'bg-[#F8F8F8] text-[#1A1A1A]'
                    : 'text-[#5A5A5A]'
                    }`}
                >
                  <span>{lang.name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}