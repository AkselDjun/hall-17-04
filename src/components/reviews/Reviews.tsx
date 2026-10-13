import { contacts, reviews } from "@/content/site";
import { Kicker, Lead, Title } from "../ui/Typography";
import { ReviewStories } from "./ReviewStories";
import styles from "./Reviews.module.css";

export function Reviews() {
  return (
    <section id="reviews" className={styles.reviews} aria-labelledby="reviews-title">
      <div className={styles.heading}>
        <Kicker>{reviews.kicker}</Kicker>
        <Title id="reviews-title">{reviews.title}</Title>
      </div>
      <Lead className={styles.lead}>{reviews.lead}</Lead>
      <a href={contacts.reviewsHighlight} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {reviews.link}
      </a>
      <ReviewStories items={reviews.items} />
    </section>
  );
}
