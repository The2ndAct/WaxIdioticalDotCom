import type { Metadata } from "next";
import Image from "next/image";
import { getProducts, getProductUrl, getMinPrice, getDefaultImage } from "@/lib/printify";

export const metadata: Metadata = {
  title: "Merch — Wax Idiotical",
  description: "Official Wax Idiotical merch. T-shirts, mugs, tote bags, and more.",
};

export default async function MerchPage() {
  const products = await getProducts();

  return (
    <div className="py-16">
      <h1 className="mb-2 font-display text-5xl leading-none tracking-wide text-foreground md:text-7xl">
        Merch
      </h1>
      <p className="mb-12 font-body text-sm text-muted">
        Official Wax Idiotical gear. Fulfilled by Printify.
      </p>

      {products.length === 0 ? (
        <p className="font-body text-muted">No products available right now. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const image = getDefaultImage(product);
            const minPrice = getMinPrice(product);
            const url = getProductUrl(product);

            return (
              <a
                key={product.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-none border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-[0_0_24px_rgba(232,200,74,0.08)]"
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  {image ? (
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-2" />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-body text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
                    {product.title}
                  </h2>
                  <p className="mt-2 font-body text-sm text-muted">
                    From ${(minPrice / 100).toFixed(2)}
                  </p>
                  <span className="mt-4 inline-block border border-accent px-4 py-1.5 font-body text-xs uppercase tracking-widest text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                    Shop Now
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
