'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Francais' },
  { code: 'de', label: 'Deutsch' },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const segments = pathname.split('/').filter(Boolean);
  const currentLanguage = segments[0] || 'en';

  const handleLanguageChange = (nextLanguage: string) => {
    const nextSegments = [...segments];

    if (nextSegments.length === 0) {
      nextSegments.push(nextLanguage);
    } else {
      nextSegments[0] = nextLanguage;
    }

    const query = searchParams.toString();
    router.push(`/${nextSegments.join('/')}${query ? `?${query}` : ''}`);
  };

  return (
    <label className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#5A5A5A]">
      <span className="hidden lg:inline">Language</span>
      <select
        aria-label="Language"
        value={currentLanguage}
        onChange={(event) => handleLanguageChange(event.target.value)}
        className="bg-transparent text-[11px] uppercase tracking-[0.12em] outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
