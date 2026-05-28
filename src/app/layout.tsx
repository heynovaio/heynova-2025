import Script from "next/script";
import { PrismicPreview } from "@prismicio/next";
import { asText } from "@prismicio/client";
import { createClient, repositoryName } from "@/prismicio";

import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { CookieConsent } from "@/components/CookieConsent";
import {
  KIRSTEN_PERSON,
  LOGO_URL,
  OG_IMAGE_URL,
  ORG_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/utils/seo";

const GA_MEASUREMENT_ID = "G-MJ9S956LHS";

// Services that exist in Prismic but should never appear in published schema.
const SERVICE_UID_BLOCKLIST = new Set(["test-service"]);

async function buildOfferCatalog() {
  try {
    const client = createClient();
    const services = await client.getAllByType("service", { lang: "en-ca" });
    const filtered = services.filter(
      (s) => s.uid && !SERVICE_UID_BLOCKLIST.has(s.uid),
    );
    if (filtered.length === 0) return null;

    return {
      "@type": "OfferCatalog",
      name: "Hey Nova Services",
      itemListElement: filtered.map((service) => {
        const serviceUrl = `${SITE_URL}/en-ca/services/${service.uid}`;
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            // Must exactly match the `@id` emitted on the per-service page
            // (`[lang]/services/[uid]/page.tsx`) so Google treats both as
            // the same entity.
            "@id": `${serviceUrl}#service`,
            name: asText(service.data.title) || "Service",
            description: service.data.meta_description || undefined,
            url: serviceUrl,
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "Canada" },
          },
        };
      }),
    };
  } catch (err) {
    // OfferCatalog is enhancement, not essential — never block layout render
    // because Prismic flaked.
    console.error("[layout] OfferCatalog build failed:", err);
    return null;
  }
}

function buildOrganizationSchema(
  offerCatalog: Awaited<ReturnType<typeof buildOfferCatalog>>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Hey Nova",
    legalName: "Hey Nova Inc.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    image: OG_IMAGE_URL,
    description:
      "Hey Nova is a women-led digital agency based in Nova Scotia, founded by Kirsten Dodd. We design and build high performing, unique websites and digital products, and we help organizations embed digital accessibility through audits, implementation support, and training that starts with people rather than jargon filled criteria lists.",
    foundingDate: "2018",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 10,
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    knowsAbout: [
      "Web Content Accessibility Guidelines (WCAG)",
      "WCAG 2.1",
      "WCAG 2.2",
      "Accessible Canada Act",
      "Accessibility for Ontarians with Disabilities Act (AODA)",
      "web accessibility auditing",
      "accessible web development",
      "UX strategy and optimization",
      "inclusive design",
      "assistive technology compatibility",
      "screen reader optimization",
      "government procurement accessibility",
      "Next.js development",
      "Shopify accessibility optimization",
      "AI workflow advisory",
      "VPAT documentation",
    ],
    founder: {
      ...KIRSTEN_PERSON,
      // worksFor is implicit when the Person is referenced from
      // Organization.founder — drop to keep this nesting clean.
      worksFor: undefined,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "kirsten@heynova.io",
      availableLanguage: "English",
    },
    hasCertification: {
      "@type": "Certification",
      name: "WBE Canada Certified Women Business Enterprise",
      issuedBy: {
        "@type": "Organization",
        name: "WBE Canada",
        url: "https://wbecanada.ca",
      },
    },
    sameAs: [
      "https://www.linkedin.com/company/hey-nova",
      "https://www.instagram.com/heynovaio/",
      "https://clutch.co/profile/hey-nova",
      "https://www.wikidata.org/wiki/Q139936327",
      "https://www.google.com/maps/place/Hey+Nova/@62.6573279,-95.989235,3z/data=!4m14!1m7!3m6!1s0x4b9e797b8bf1970d:0xb10219a13ef5ce44!2sHey+Nova!8m2!3d62.6573279!4d-95.989235!16s%2Fg%2F11nk6w5z8s!3m5!1s0x4b9e797b8bf1970d:0xb10219a13ef5ce44!8m2!3d62.6573279!4d-95.989235!16s%2Fg%2F11nk6w5z8s",
    ],
    ...(offerCatalog ? { hasOfferCatalog: offerCatalog } : {}),
  };
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Hey Nova",
  publisher: { "@id": ORG_ID },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const offerCatalog = await buildOfferCatalog();
  const organizationSchema = buildOrganizationSchema(offerCatalog);
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
