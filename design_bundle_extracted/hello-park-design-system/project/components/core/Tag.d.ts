import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  /** Fill color — brand orange/amber or a play-palette accent. */
  color?: 'orange' | 'amber' | 'lime' | 'green' | 'lilac' | 'violet' | 'magenta' | 'sky' | 'navy' | 'ink';
  /** Neutral outline instead of a solid fill. */
  outline?: boolean;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/**
 * Uppercase mono pill for categories & topics (e.g. "Dubai Park", "Phygital").
 */
export function Tag(props: TagProps): JSX.Element;
