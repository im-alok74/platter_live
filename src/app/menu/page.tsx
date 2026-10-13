import type { Metadata } from "next";
import { menu } from "@/data/site";
import { MenuBrowser } from "./menu-browser";

export const metadata: Metadata = {
  title: "Menu: coffee, breakfast, pizza, pasta and more",
  description: "The full Platter menu with prices: coffee, tea, breakfast, pizzas, pastas, Indian mains, Chinese, salads and desserts.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <main>
      <h1 className="sr-only">Platter menu</h1>
      <MenuBrowser categories={menu} summary="Prices in rupees, taxes as applicable" />
    </main>
  );
}
