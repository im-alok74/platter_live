import menuJson from "./menu-data.json";
import galleryJson from "./gallery.json";
import type { Hours } from "@/lib/hours";

/** Everything the public site shows. Edit this file (and menu-data.json) to change it; there is no database. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const hours: Hours = { open: "11:00", close: "22:30", weekly_off: [] };

export const contact = {
  phone: "+919829044442",
  whatsapp: "919829044442",
  email: "mshamama@hotmail.com",
  address: "Platter 9 (Lower Ground Floor), Rajasthan International Centre (RIC), Sansthan Path, JLN Marg, Jhalana Doongri, Jaipur, Rajasthan 302017",
  maps_url: "https://maps.app.goo.gl/yQWZKutQKqLdydDy7",
  instagram: "https://www.instagram.com/platter_cafe",
};

export const legal = { entity: "Kehwa", tagline: "A unit of Kehwa", fssai: "12223026002434", gst_number: "08AARFK0670K1ZW" };

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  ingredients: string | null;
  method: string | null;
  price: number;
  is_veg: boolean;
  badges: string[];
  sold_out: boolean;
  is_special: boolean;
  image: { url: string } | null;
  variants: { id: string; name: string; price: number }[];
};
export type MenuCategory = { id: string; name: string; slug: string; image: { url: string } | null; items: MenuItem[] };

export const menu = menuJson as MenuCategory[];
export const gallery = galleryJson as { url: string; width: number | null; height: number | null }[];
