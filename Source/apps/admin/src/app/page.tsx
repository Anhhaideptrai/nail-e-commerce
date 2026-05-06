const modules = [
  'Products',
  'Collections',
  'Orders',
  'Customers',
  'Wholesale Forms',
  'Discounts',
  'Shipping',
  'Currency',
];

export default function Index() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-neutral-200 bg-white px-5 py-6">
          <h1 className="text-lg font-semibold">Nail Commerce</h1>
          <nav className="mt-8 grid gap-1">
            {modules.map((module) => (
              <a
                className="px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                href={`/${module.toLowerCase().replaceAll(' ', '-')}`}
                key={module}
              >
                {module}
              </a>
            ))}
          </nav>
        </aside>

        <section className="px-6 py-6">
          <header className="flex items-center justify-between border-b border-neutral-200 pb-5">
            <div>
              <p className="text-sm text-neutral-500">CMS Admin</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Operations dashboard
              </h2>
            </div>
            <button className="border border-neutral-300 bg-white px-4 py-2 text-sm font-medium">
              New product
            </button>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['New orders', 'Pending wholesale', 'Active discounts'].map(
              (label, index) => (
                <div
                  className="border border-neutral-200 bg-white p-5"
                  key={label}
                >
                  <p className="text-sm text-neutral-500">{label}</p>
                  <p className="mt-3 text-3xl font-semibold">{index}</p>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
