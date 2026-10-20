import photos from "@/content/photos.json";
import { contacts, meta, offers, operator, siteUrl } from "@/content/site";

const catalog = photos as Record<string, { widths: number[] }>;
const venueId = `${siteUrl}/#venue`;

const image = (src: string) => `${siteUrl}/images/${src}-${catalog[src].widths.at(-1)}.webp`;

const amount = (price: string) => {
  const match = price.match(/\d[\d\s]*/);
  return match ? Number(match[0].replace(/\s/g, "")) : null;
};

const amenities = [
  "Сцена",
  "LED-экран",
  "Сценический свет и тяжёлый дым",
  "Звуковое оборудование",
  "Банкетная посадка до 55 гостей",
  "Фотостудия",
];

const services = offers.items.map((item) => {
  const value = amount(item.price);
  const hourly = item.price.includes("час");
  const from = item.price.trim().startsWith("от");
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: item.title,
      description: `${item.features.join(". ")}.`,
      areaServed: { "@type": "City", name: contacts.city },
    },
    ...(value && {
      priceSpecification: {
        "@type": hourly ? "UnitPriceSpecification" : "PriceSpecification",
        ...(from ? { minPrice: value } : { price: value }),
        priceCurrency: "BYN",
        ...(hourly && { unitCode: "HUR", unitText: "час" }),
      },
    }),
  };
});

const prices = offers.items.map((item) => amount(item.price)).filter((value): value is number => value !== null);

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "HALL 17.04",
      description: meta.description,
      inLanguage: "ru",
      publisher: { "@id": venueId },
    },
    {
      "@type": ["EventVenue", "LocalBusiness"],
      "@id": venueId,
      name: "HALL 17.04",
      legalName: operator.name,
      taxID: operator.unp,
      description: meta.description,
      slogan: "В главной роли — вы.",
      url: `${siteUrl}/`,
      telephone: contacts.phoneHref.replace("tel:", ""),
      image: [`${siteUrl}/og.jpg`, image("hall-banquet"), image("stage-band-1"), image("format-wedding")],
      logo: `${siteUrl}/icons/icon-512.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: contacts.street,
        addressLocality: contacts.city,
        addressRegion: contacts.region,
        postalCode: contacts.postalCode,
        addressCountry: "BY",
      },
      geo: { "@type": "GeoCoordinates", ...contacts.geo },
      hasMap: contacts.map,
      areaServed: { "@type": "City", name: contacts.city },
      maximumAttendeeCapacity: 55,
      currenciesAccepted: "BYN",
      ...(prices.length > 0 && { priceRange: `от ${Math.min(...prices)} BYN` }),
      amenityFeature: amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      makesOffer: services,
      sameAs: [contacts.instagram.url, contacts.studioInstagram.url],
    },
  ],
};

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}
