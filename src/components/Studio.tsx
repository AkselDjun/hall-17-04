import Image from "next/image";
import { contacts, studio } from "@/content/site";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/cx";
import { BookingLink } from "./booking/BookingContext";
import { button } from "./ui/button";
import { ExternalIcon } from "./ui/icons";
import { Photo } from "./ui/Photo";
import { Kicker, Lead, Lines, Title } from "./ui/Typography";
import styles from "./Studio.module.css";

const LOGO = asset("/brand/photostudio-logo.svg");


export function Studio() {
  const [first, second, third] = studio.gallery;
  const gallerySizes = "(max-width: 640px) 50vw, (max-width: 1099px) 33vw, 260px";

  return (
    <section id="studio" className={styles.studio} aria-labelledby="studio-title">
      <div className={styles.heading}>
        <Kicker>{studio.kicker}</Kicker>
        <Title id="studio-title" size="m">
          <Lines lines={studio.title} />
        </Title>
      </div>

      <Lead className={styles.lead}>{studio.lead}</Lead>

      <div className={styles.badge}>
        <span className={styles.badgeValue}>{studio.badge.value}</span>
        <div className={styles.badgeText}>
          <span className={styles.badgeTitle}>{studio.badge.title}</span>
          <span className={styles.badgeNote}>{studio.badge.note}</span>
        </div>
      </div>

      <div className={styles.ctaWrap}>
        <BookingLink format="Фотостудия" className={cx(button({ variant: "outline", size: "sm" }), styles.cta)}>
          {studio.cta}
        </BookingLink>
      </div>

      <a
        href={contacts.studioInstagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.profile}
        aria-label={`${studio.profile.name} в Instagram`}
      >
        <span className={styles.profileRow}>
          <span className={styles.avatar}>
            <span className={styles.avatarInner}>
              <Image src={LOGO} alt="" width={47} height={16} unoptimized className={styles.avatarLogo} />
            </span>
          </span>
          <span className={styles.profileInfo}>
            <span className={styles.profileName}>{studio.profile.name}</span>
            <span className={styles.profileStats}>
              <span>
                <b>{studio.profile.posts}</b> публикаций
              </span>
              <span>
                <b>{studio.profile.followers}</b> подписчик
              </span>
            </span>
          </span>
          <ExternalIcon size={16} className={styles.profileIcon} />
        </span>
        <span className={styles.profileBio}>
          {studio.profile.bio}
          <br />
          Аренда одежды <span className={styles.accent}>{studio.profile.rent}</span>
        </span>
      </a>

      <div className={styles.gallery} data-reveal="up">
        <figure className={cx(styles.shot, styles.shotFirst)}>
          <div className={styles.frame}>
            <Photo src={first.src} alt={first.alt} sizes={gallerySizes} />
          </div>
          <figcaption>{first.caption}</figcaption>
        </figure>
        <figure className={cx(styles.shot, styles.shotSecond)}>
          <div className={styles.frame}>
            <Photo src={second.src} alt={second.alt} sizes={gallerySizes} />
          </div>
          <figcaption>{second.caption}</figcaption>
        </figure>
        <div className={styles.column}>
          <a
            href={contacts.studioInstagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logo}
            aria-label="Photo studio 17.04 в Instagram"
          >
            <Image src={LOGO} alt="Photo studio 17.04" width={240} height={79} unoptimized />
          </a>
          <figure className={cx(styles.shot, styles.shotThird)}>
            <div className={styles.frame}>
              <Photo src={third.src} alt={third.alt} sizes={gallerySizes} />
            </div>
            <figcaption>{third.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
