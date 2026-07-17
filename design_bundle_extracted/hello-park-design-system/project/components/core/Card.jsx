import React from 'react';

/**
 * Hello Park — Card
 * Flat surface (hairline, no shadow) or a solid color-filled block.
 * One saturated color per card — never gradients.
 */
export function Card({
  children,
  variant = 'surface',
  eyebrow,
  title,
  action,
  size = 'md',
  style,
  ...rest
}) {
  const fills = {
    surface: { bg: 'var(--surface)', fg: 'var(--text-body)', head: 'var(--ink)', meta: 'var(--ink-60)', border: '1px solid var(--line)' },
    orange: { bg: 'var(--orange)', fg: 'rgba(255,255,255,0.92)', head: '#fff', meta: 'rgba(255,255,255,0.8)', border: 'none' },
    dark: { bg: 'var(--ink)', fg: 'rgba(255,255,255,0.78)', head: '#fff', meta: 'rgba(255,255,255,0.6)', border: 'none' },
    lilac: { bg: 'var(--play-lilac)', fg: 'rgba(24,26,28,0.78)', head: 'var(--ink)', meta: 'rgba(24,26,28,0.6)', border: 'none' },
    amber: { bg: 'var(--amber)', fg: 'rgba(24,26,28,0.82)', head: 'var(--ink)', meta: 'rgba(24,26,28,0.6)', border: 'none' },
  };
  const f = fills[variant] || fills.surface;
  const pad = size === 'lg' ? 32 : size === 'sm' ? 20 : 26;

  return (
    <div
      style={{
        background: f.bg,
        color: f.fg,
        border: f.border,
        borderRadius: 'var(--radius-lg)',
        padding: pad,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: f.meta }}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 24, lineHeight: 1.1, color: f.head, margin: 0 }}>
          {title}
        </h3>
      )}
      {children && <div style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.55 }}>{children}</div>}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  );
}
