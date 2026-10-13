import { contacts, meta, siteUrl } from "@/content/site";

const data = {
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

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
