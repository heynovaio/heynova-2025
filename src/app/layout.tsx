import Script from "next/script";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const GA_MEASUREMENT_ID = "G-MJ9S956LHS";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Hey Nova",
  legalName: "Hey Nova Inc.",
  url: "https://heynova.io",
  logo: {
    "@type": "ImageObject",
    url: "https://heynova.io/logo.png",
  },
  description:
    "Canadian, women-led digital agency specializing in inclusive, accessible web design and development for mission-driven organizations. We serve nonprofits, public sector, and purpose-driven businesses across Canada.",
  areaServed: "CA",
  email: "info@heynova.io",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Nova Scotia",
    addressCountry: "CA",
  },
  knowsAbout: [
    "WCAG 2.2 accessibility compliance",
    "Accessible Canada Act (ACA) compliance",
    "AODA compliance",
    "web accessibility audits and remediation",
    "inclusive web design",
    "Next.js development",
    "Prismic headless CMS",
    "nonprofit web development Canada",
    "digital accessibility consulting",
    "usability strategy and UX design",
    "headless CMS migration",
    "design systems for nonprofits",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@heynova.io",
      areaServed: "CA",
      availableLanguage: ["en", "fr"],
    },
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "International Association of Accessibility Professionals",
      url: "https://www.accessibilityassociation.org/",
    },
    {
      "@type": "Organization",
      name: "WBE Canada",
      url: "https://wbecanada.ca/",
    },
  ],
  sameAs: [
    "https://www.instagram.com/heynovaio/",
    "https://ca.linkedin.com/company/hey-nova",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hey Nova",
  url: "https://heynova.io",
  inLanguage: "en-CA",
  description:
    "Digital systems for real people — inclusive web design, accessibility consulting, and digital strategy for mission-driven organizations.",
  publisher: {
    "@type": "Organization",
    name: "Hey Nova",
    url: "https://heynova.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c"),
          }}
        />

        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin=""
        />
        <link rel="stylesheet" href="https://use.typekit.net/sty6ouh.css" />
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <PrismicPreview repositoryName={repositoryName} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
