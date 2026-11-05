import Image from "next/image";

export function Wordmark({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src="/logo.png" alt="Platter" width={900} height={335} priority className={className} />;
}
