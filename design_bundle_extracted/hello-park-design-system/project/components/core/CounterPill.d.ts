import React from 'react';

export interface CounterPillProps {
  count: number;
  tone?: 'orange' | 'ink' | 'soft';
  style?: React.CSSProperties;
}

/**
 * Tiny numeric badge beside mono nav links / labels (e.g. "Projects 68").
 */
export function CounterPill(props: CounterPillProps): JSX.Element;
