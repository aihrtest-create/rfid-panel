import React from 'react';

/**
 * Hello Park — Tag
 * Mono-label pill. Solid brand/play fill, or neutral outline.
 */
export function Tag({ children, color = 'orange', outline = false, size = 'md', style, ...rest }) {
  const palette = {
    orange: 'var(--orange)',
    amber: 'var(--amber)',
    lime: 'var(--play-lime)',
    green: 'var(--play-green)',
    lilac: 'var(--play-lilac)',
    violet: 'var(--play-violet)',
    magenta: 'var(--play-magenta)',
    sky: 'var(--play-sky)',
    navy: 'var(--play-navy)',
    ink: 'var(--ink)',
  };
  const lightOn = ['amber', 'lime', 'lilac'];
  const fg = lightOn.includes(color) ? 'var(--ink)' : '#fff';
  const bg = palette[color] || palette.orange;
  const sizes = { sm: { padding: '5px 11px', fontSize: 11 }, md: { padding: '7px 14px', fontSize: 12.5 } };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        background: outline ? 'transparent' : bg,
        color: outline ? 'var(--ink)' : fg,
        border: outline ? '1.5px solid var(--border-strong)' : '1.5px solid transparent',
        ...sizes[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
