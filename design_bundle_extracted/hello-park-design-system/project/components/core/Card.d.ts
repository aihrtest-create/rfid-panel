import React from 'react';

/**
 * Props for the content Card.
 * @startingPoint section="Core" subtitle="Flat or color-filled content card" viewport="700x260"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** surface = flat white w/ hairline; the rest are solid color-filled blocks. */
  variant?: 'surface' | 'orange' | 'dark' | 'lilac' | 'amber';
  /** Mono uppercase eyebrow above the title. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Footer action node (e.g. a Button or IconButton). */
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/**
 * Content block — flat white surface or one solid saturated fill. Radius lg (32px).
 */
export function Card(props: CardProps): JSX.Element;
