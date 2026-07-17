import React from 'react';

/**
 * Props for the floating pill NavBar.
 * @startingPoint section="Navigation" subtitle="Floating pill nav bar" viewport="1100x96"
 */
export interface NavBarProps {
  /** Logo image src (relative to the consuming page). Falls back to a wordmark. */
  logoSrc?: string;
  brand?: string;
  links?: NavLink[];
  /** CTA pill label. */
  cta?: string;
  onCta?: () => void;
  activeIndex?: number;
  style?: React.CSSProperties;
}

export interface NavLink {
  label: string;
  href?: string;
  count?: number;
}

/**
 * The floating white pill navigation — logo, mono links (+ counters), CTA. Uses shadow-nav.
 */
export function NavBar(props: NavBarProps): JSX.Element;
