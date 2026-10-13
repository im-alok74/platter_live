// Global next/image loader. Cloudinary resizes and picks the best format; Unsplash takes width and quality as query params.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.includes("images.unsplash.com")) return `${src}${src.includes("?") ? "&" : "?"}auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;
  return src.replace("/upload/", `/upload/f_auto,q_${quality ?? "auto"},w_${width},c_limit/`);
}
