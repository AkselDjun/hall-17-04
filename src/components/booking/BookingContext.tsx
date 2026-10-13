"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { bookingFormats, type BookingFormat } from "@/content/site";

type BookingContextValue = {
  format: BookingFormat;
  setFormat: (format: BookingFormat) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [format, setFormat] = useState<BookingFormat>(bookingFormats[0]);
  const value = useMemo(() => ({ format, setFormat }), [format]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}

type BookingLinkProps = {
  format?: BookingFormat;
  className?: string;
  children: ReactNode;
};

export function BookingLink({ format, className, children }: BookingLinkProps) {
  const { setFormat } = useBooking();
  return (
    <a href="#booking" className={className} onClick={() => format && setFormat(format)}>
      {children}
    </a>
  );
}
