import { Button } from '@source/ui';

const featuredCollections = ['New Arrivals', 'Best Sellers', 'Custom Sets'];

export default function Index() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-5">
        <header className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-neutral-800">
            Nail Atelier
          </span>
          <nav className="hidden gap-6 text-sm text-neutral-600 sm:flex">
            <a href="/collections">Collections</a>
            <a href="/how-to-measure">How to Measure</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Handmade press-on nails
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
              Luxury nail sets for custom everyday styling.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
              A SEO-ready storefront foundation for product discovery,
              collections, size and shape selection, guest checkout, and
              international selling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Shop new arrivals</Button>
              <Button variant="secondary">View size guide</Button>
            </div>
          </div>

          <div className="aspect-[4/5] border border-neutral-200 bg-neutral-100 p-6">
            <div className="flex h-full items-end bg-[linear-gradient(135deg,#ffffff,#d8d8d8_45%,#f7f7f7)] p-6">
              <div>
                <p className="text-sm font-medium text-neutral-500">Featured</p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Silver minimal collection
                </h2>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-3 border-t border-neutral-200 py-6 sm:grid-cols-3">
          {featuredCollections.map((collection) => (
            <a
              className="border border-neutral-200 px-4 py-4 text-sm font-medium"
              href={`/collections/${collection.toLowerCase().replaceAll(' ', '-')}`}
              key={collection}
            >
              {collection}
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
