import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QCF Conseil — La gestion de patrimoine, réinventée",
  description:
    "Cabinet indépendant. Structuration, fiscalité, investissement, transmission. Pour les patrimoines qui exigent précision et discrétion.",
  metadataBase: new URL("https://qcf-conseil.fr"),
  openGraph: {
    title: "QCF Conseil",
    description:
      "Structurer. Optimiser. Transmettre. Un cabinet indépendant pensé pour le temps long.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body className="grain font-sans">{children}</body>
    </html>
  );
}
