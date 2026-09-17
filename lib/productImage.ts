const FALLBACK_PHONE_IMAGE =
  "https://images.unsplash.com/photo-1511707171634-597466aa0278?q=80&w=800&auto=format&fit=crop";

export function resolveProductImage(src?: string): string {
  if (!src) return FALLBACK_PHONE_IMAGE;
  return src;
}

export { FALLBACK_PHONE_IMAGE };
