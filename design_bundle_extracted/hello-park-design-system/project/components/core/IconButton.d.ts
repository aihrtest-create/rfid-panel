import React from 'react';

export interface IconButtonProps {
  /** Glyph or node. Defaults to the brand chevron "›". */
  children?: React.ReactNode;
  variant?: 'primary' | 'ink' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (required for icon-only buttons). */
  label?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Circular icon button — the chevron "›" affordance. Hover darkens + slides right 2px.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
