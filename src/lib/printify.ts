export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  images: { src: string; is_default: boolean }[];
  variants: { price: number; is_enabled: boolean }[];
  external?: { id: string; handle: string };
}

const SHOP_ID = "28410449";
const STOREFRONT = "https://waxidiotical.printify.me";

export async function getProducts(): Promise<PrintifyProduct[]> {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) return [];

  const res = await fetch(
    `https://api.printify.com/v1/shops/${SHOP_ID}/products.json`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: false },
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.data as PrintifyProduct[];
}

export function getProductUrl(product: PrintifyProduct): string {
  return product.external?.handle ?? STOREFRONT;
}

export function getMinPrice(product: PrintifyProduct): number {
  const prices = product.variants
    .filter((v) => v.is_enabled)
    .map((v) => v.price);
  return prices.length ? Math.min(...prices) : 0;
}

export function getDefaultImage(product: PrintifyProduct): string | null {
  const def = product.images.find((i) => i.is_default);
  return def?.src ?? product.images[0]?.src ?? null;
}
