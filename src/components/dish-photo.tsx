import Image from "next/image";

type Photo = { url: string; blur_data_url?: string | null } | null;


/**
 * A dish's photo area. Every dish has one: the photo when it exists, otherwise a tinted tile with the dish's initial,
 * so the layout never changes shape when a photo is added later. Fills its parent, which sets the aspect ratio.
 */
export function DishPhoto({ name, image, sizes, priority = false, label = true, className = "" }: { name: string; image: Photo; sizes: string; priority?: boolean; label?: boolean; className?: string }) {
  if (image)
    return <Image src={image.url} alt="" fill sizes={sizes} priority={priority} placeholder={image.blur_data_url ? "blur" : "empty"} blurDataURL={image.blur_data_url ?? undefined} className={`object-cover object-[50%_40%] ${className}`} />;
  return (
    <div aria-hidden className={`absolute inset-0 flex flex-col items-center justify-center gap-1 bg-sand ${className}`}>
      <span className={`font-display leading-none text-gold/40 ${label ? "text-6xl md:text-7xl" : "text-3xl"}`}>{name.charAt(0).toUpperCase()}</span>
      {label && <span className="text-xs font-medium text-muted">Photo coming soon</span>}
    </div>
  );
}
