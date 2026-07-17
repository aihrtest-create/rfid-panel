import React from 'react';

/**
 * Hello Park — CounterPill
 * Small numeric badge used beside mono nav links and labels.
 */
export function CounterPill({ count = 0, tone = 'orange', style, ...rest }) {
  const tones = {
    orange: { bg: 'var(--orange)', fg: '#fff' },
    ink: { bg: 'var(--ink)', fg: '#fff' },
    soft: { bg: 'var(--orange-100)', fg: 'var(--orange-deep)' },
  };
  const t = tones[tone] || tones.orange;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 22,
        height: 22,
        padding: '0 7px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        background: t.bg,
        color: t.fg,
        ...style,
      }}
      {...rest}
    >
      {count}
    </span>
  );
}
