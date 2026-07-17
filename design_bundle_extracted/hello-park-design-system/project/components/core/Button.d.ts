import React from 'react';

/**
 * Props for the Hello Park pill button.
 * @startingPoint section="Core" subtitle="Pill button — primary / secondary / ghost / amber" viewport="700x140"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. primary = orange, secondary = ink, ghost = outline, amber = amber fill. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  /** Append a trailing chevron "›" (the brand affordance glyph). */
  chevron?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Hello Park primary action. Pill-shaped, flat fill; hover darkens, press nudges down 1px.
 */
export function Button(props: ButtonProps): JSX.Element;
