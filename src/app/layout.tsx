import Script from "next/script";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { CookieConsent } from "@/components/CookieConsent";

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
    "website design Nova Scotia",
    "web development Nova Scotia",
    "website development Canada",
    "custom website design Halifax",
    "small business website Canada",
    "nonprofit website design Canada",
    "government website accessibility Canada",
    "federal procurement digital services",
    "AODA compliance auditing",
    "Shopify accessibility optimization",
    "UX strategy for nonprofits",
    "user experience research Canada",
    "digital transformation nonprofits",
    "women-owned digital agency Canada",
    "WBE certified technology company",
    "remote digital agency Canada",
    "accessible content strategy",
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
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/sty6ouh.css" />
        {/*
          GA bootstrap runs beforeInteractive so window.gtag and the default
          consent state are guaranteed to exist before any React effect runs
          (including CookieConsent's effect that reads localStorage and may
          immediately call gtag('consent', 'update', ...)). The external
          gtag.js library + config stay afterInteractive so they don't block
          page load.
        */}
        <Script id="ga-bootstrap" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500,
            });
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <PrismicPreview repositoryName={repositoryName} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`window.gtag && window.gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
        </Script>
        <CookieConsent />
      </body>
    </html>
  );
}
