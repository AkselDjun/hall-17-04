import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PolicyToc } from "@/components/policy/PolicyToc";
import styles from "@/components/policy/Policy.module.css";
import { CheckIcon, InfoIcon } from "@/components/ui/icons";
import { operator, policy, policySections, policySummary, type PolicyBlock } from "@/content/policy";
import { contacts, siteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata(`${policy.title} — HALL 17.04`, `${policy.lead}.`);

const host = siteUrl.replace(/^https?:\/\//, "");

const fill = (html: string) =>
  html
    .replaceAll("{{phone}}", `<a class="nw" href="${contacts.phoneHref}">${contacts.phone}</a>`)
    .replaceAll("{{email}}", operator.email.startsWith("[") ? operator.email : `<a href="mailto:${operator.email}">${operator.email}</a>`)
    .replaceAll("{{instagram}}", `<a href="${contacts.instagram.url}" target="_blank" rel="noopener noreferrer">${contacts.instagram.handle}</a>`)
    .replaceAll("{{host}}", `<a href="${siteUrl}/">${host}</a>`)
    .replaceAll("{{address}}", contacts.addressFull);

function Html({ as: Tag = "p", html }: { as?: "p" | "li" | "dd" | "span"; html: string }) {
  return <Tag dangerouslySetInnerHTML={{ __html: fill(html) }} />;
}

function Block({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "p":
      return <Html html={block.html} />;
    case "note":
      return (
        <div className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true">
            <InfoIcon size={18} />
          </span>
          <Html html={block.html} />
        </div>
      );
    case "ul":
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <Html key={item} as="li" html={item} />
          ))}
        </ul>
      );
    case "dl":
      return (
        <dl className={styles.dl}>
          {block.rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <Html as="dd" html={value} />
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                {block.cols.map((col, index) => (
                  <th key={col} scope="col" style={{ width: `${block.widths[index]}%` }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={block.cols[index]} data-label={block.cols[index]} dangerouslySetInnerHTML={{ __html: fill(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.top}>
        <div className={styles.bar}>
          <Link href="/" className={styles.back}>
            ← Вернуться на сайт
          </Link>
          <Link href="/" className={styles.mark}>
            HALL 17.04
          </Link>
        </div>
        <div className={styles.head}>
          <p className={styles.kicker}>Документы</p>
          <h1>{policy.title}</h1>
          <p className={styles.lead}>{policy.lead}</p>
          <div className={styles.meta}>
            <span>Редакция от {policy.date}</span>
            <span>{policy.law}</span>
          </div>
        </div>
      </header>

      <main className={styles.body}>
        <PolicyToc items={policySections.map(({ id, title }) => ({ id, title }))} />
        <div className={styles.content}>
          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Коротко</p>
            <ul>
              {policySummary.map((item) => (
                <li key={item}>
                  <span className={styles.summaryIcon} aria-hidden="true">
                    <CheckIcon size={14} />
                  </span>
                  <Html as="span" html={item} />
                </li>
              ))}
            </ul>
          </div>

          {policySections.map((section, index) => (
            <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.blocks.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} />
              ))}
            </section>
          ))}
        </div>
      </main>

      <Footer current="privacy" />
      <JsonLd data={breadcrumbSchema(policy.title, "/privacy/")} />
    </div>
  );
}
