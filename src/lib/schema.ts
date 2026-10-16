import { contacts, meta, siteUrl } from "@/content/site";

export const venueSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "HALL 17.04",
  description: meta.description,
  url: `${siteUrl}/`,
  image: `${siteUrl}/og.jpg`,
  telephone: contacts.phoneHref.replace("tel:", ""),
  maximumAttendeeCapacity: 55,
  address: {
    "@type": "PostalAddress",
    streetAddress: contacts.street,
    addressLocality: contacts.city,
    addressCountry: "BY",
  },
  sameAs: [contacts.instagram.url, contacts.studioInstagram.url],
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
