import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EEVI Vida de Crianca | Escola de Educacao Infantil em Barretos-SP",
  description:
    "Escola de Educacao Infantil e Ensino Fundamental em Barretos-SP. Sistema de Ensino Objetivo. Do bercario (5 meses) ao Fundamental I. Matriculas abertas!",
  keywords: [
    "escola barretos",
    "educacao infantil barretos",
    "colegio barretos",
    "bercario barretos",
    "ensino fundamental barretos",
    "escola particular barretos",
    "creche barretos",
    "sistema objetivo barretos",
    "EEVI Vida de Crianca",
    "Colegio Valcris",
  ],
  authors: [{ name: "EEVI Vida de Crianca" }],
  openGraph: {
    title: "EEVI Vida de Crianca | Escola em Barretos-SP",
    description:
      "Escola de Educacao Infantil e Ensino Fundamental em Barretos. Sistema de Ensino Objetivo. Do bercario ao Fundamental I.",
    url: "https://eeividadecrianca.com.br",
    siteName: "EEVI Vida de Crianca",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://eeividadecrianca.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: "EEVI Vida de Crianca - Colegio Valcris",
              description:
                "Escola de Educacao Infantil e Ensino Fundamental em Barretos-SP. Sistema de Ensino Objetivo.",
              url: "https://eeividadecrianca.com.br",
              telephone: "+5517997014713",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Avenida 25, 437",
                addressLocality: "Barretos",
                addressRegion: "SP",
                postalCode: "14780-330",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -20.5575,
                longitude: -48.5678,
              },
              sameAs: [
                "https://www.instagram.com/colegiovalcrisvidadecrianca/",
                "https://www.facebook.com/eeividadecrianca/",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "07:00",
                closes: "18:00",
              },
              priceRange: "$$",
              image: "https://eeividadecrianca.com.br/og-image.jpg",
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
