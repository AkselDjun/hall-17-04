import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, strokeWidth = 1.6, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (props: IconProps) => (
  <Icon strokeWidth={1.5} {...props}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Icon>
);

export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Icon>
);

export const ChatIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </Icon>
);

export const ExternalIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 5h5v5M19 5l-9 9M18 14v5H5V6h5" />
  </Icon>
);

export const ExpandIcon = (props: IconProps) => (
  <Icon strokeWidth={1.8} {...props}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </Icon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <Icon strokeWidth={1.8} {...props}>
    <path d="M15 5l-7 7 7 7" />
  </Icon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Icon strokeWidth={1.8} {...props}>
    <path d="M9 5l7 7-7 7" />
  </Icon>
);

export const AlertIcon = (props: IconProps) => (
  <Icon strokeWidth={1.8} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.5" />
  </Icon>
);

export const RetryIcon = (props: IconProps) => (
  <Icon strokeWidth={2} {...props}>
    <path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon strokeWidth={2} {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const PinIcon = ({ size = 36, ...rest }: IconProps) => (
  <svg width={size} height={(size * 48) / 36} viewBox="0 0 36 48" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...rest}>
    <path d="M18 46C18 46 33 29 33 17A15 15 0 1 0 3 17C3 29 18 46 18 46Z" />
    <circle cx="18" cy="17" r="5" />
  </svg>
);
