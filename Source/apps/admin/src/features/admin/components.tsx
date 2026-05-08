'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { navItems } from './admin.data';
import { supportedAdminLocales } from './i18n/messages';
import { useAdminTranslation } from './i18n/admin-i18n-provider';
import type { Metric, TableRow, Tone } from './admin.types';

const toneStyles: Record<Tone, string> = {
  neutral: 'border-neutral-200 bg-neutral-100 text-neutral-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-rose-200 bg-rose-50 text-rose-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
};

export function AdminShell({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useAdminTranslation();

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-neutral-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{t('common.brand')}</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">{t('common.adminConsole')}</h1>
          </div>
          <nav className="grid gap-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                className="group rounded-md px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                href={item.href}
                key={item.href}
              >
                <span className="block font-medium">{t(item.labelKey)}</span>
                <span className="mt-0.5 block text-xs text-neutral-400 group-hover:text-neutral-500">
                  {t(item.descriptionKey)}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">{t('common.cmsAdmin')}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{t('common.operationsDashboard')}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  {t('common.language')}
                  <select
                    className="rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm font-normal text-neutral-950"
                    onChange={(event) => setLocale(event.target.value as typeof locale)}
                    value={locale}
                  >
                    {supportedAdminLocales.map((option) => (
                      <option key={option} value={option}>
                        {option === 'en' ? t('common.english') : t('common.vietnamese')}
                      </option>
                    ))}
                  </select>
                </label>
                <Link
                  className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-500"
                  href="/orders"
                >
                  {t('common.reviewOrders')}
                </Link>
                <Link
                  className="rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                  href="/products"
                >
                  {t('common.newProduct')}
                </Link>
              </div>
            </div>
          </header>

          <div className="grid gap-5 px-5 py-6 md:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">{description}</p>
      </div>
      {actionLabel ? (
        <button className="w-fit rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-neutral-500">{metric.label}</p>
        <span className="rounded-full border border-neutral-200 px-2 py-1 text-[11px] text-neutral-500">
          {metric.trend}
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{metric.value}</p>
      <p className="mt-2 text-sm text-neutral-500">{metric.detail}</p>
    </article>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 p-5">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description ? <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p> : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function DataTable({ columns, rows }: { columns: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-[0.12em] text-neutral-400">
            {columns.map((column) => (
              <th className="pb-3 pr-4 font-medium" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((row, rowIndex) => (
            <tr className="text-neutral-700" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td className="py-3 pr-4 align-middle" key={`${rowIndex}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}

export function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function Field({
  label,
  value,
  type = 'text',
}: {
  label: string;
  value?: string;
  type?: 'text' | 'number' | 'email' | 'password';
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
      {label}
      <input
        className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-normal text-neutral-950 outline-none focus:border-neutral-600"
        defaultValue={value}
        type={type}
      />
    </label>
  );
}

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
      {label}
      <select className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-normal text-neutral-950 outline-none focus:border-neutral-600">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
