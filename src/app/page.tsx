import { ActionBar } from "@/components/ActionBar";
import { Booking } from "@/components/booking/Booking";
import { BookingProvider } from "@/components/booking/BookingContext";
import { Footer } from "@/components/Footer";
import { Formats } from "@/components/Formats";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Offers } from "@/components/offers/Offers";
import { Promo } from "@/components/Promo";
import { Reviews } from "@/components/reviews/Reviews";
import { Space } from "@/components/Space";
import { Studio } from "@/components/Studio";
import { Tech } from "@/components/Tech";
import { Ticker } from "@/components/Ticker";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Space />
        <Formats />
        <Tech />
        <Promo />
        <Studio />
        <Reviews />
        <Offers />
        <Booking />
      </main>
      <Footer />
      <ActionBar />
      <JsonLd />
      <RevealObserver />
    </BookingProvider>
  );
}
