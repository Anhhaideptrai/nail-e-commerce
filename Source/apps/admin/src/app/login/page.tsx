'use client';

import { Field } from '@/features/admin/components';
import { useAdminTranslation } from '@/features/admin/i18n/admin-i18n-provider';

export default function LoginPage() {
  const { t } = useAdminTranslation();

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f6f3] px-5 text-neutral-950">
      <section className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{t('common.brand')}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{t('login.title')}</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {t('login.description')}
        </p>
        <form className="mt-6 grid gap-4">
          <Field label={t('form.email')} type="email" value="owner@silver14.test" />
          <Field label={t('form.password')} type="password" value="password" />
          <button className="rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            {t('action.signIn')}
          </button>
        </form>
      </section>
    </main>
  );
}
