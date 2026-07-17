import React from 'react';

/**
 * Hello Park — Button
 * Pill-shaped, flat. Hover darkens fill; press deepens + nudges down 1px.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  chevron = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 13 },
    md: { padding: '13px 24px', fontSize: 15 },
    lg: { padding: '17px 32px', fontSize: 17 },
  };

  const variants = {
    primary: { '--bg': 'var(--orange)', '--bgh': 'var(--orange-700)', '--bga': 'var(--orange-deep)', '--fg': '#fff', '--bd': 'transparent' },
    secondary: { '--bg': 'var(--ink)', '--bgh': '#000', '--bga': '#000', '--fg': '#fff', '--bd': 'transparent' },
    ghost: { '--bg': 'transparent', '--bgh': 'var(--orange-50)', '--bga': 'var(--orange-100)', '--fg': 'var(--ink)', '--bd': 'var(--border-strong)' },
    amber: { '--bg': 'var(--amber)', '--bgh': '#F0A800', '--bga': '#E59E00', '--fg': 'var(--ink)', '--bd': 'transparent' },
  };

  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="hp-btn"
      style={{
        ...v,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: '1.5px solid var(--bd)',
        background: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--bgh)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {children}
      {chevron && <span aria-hidden="true" style={{ fontSize: '1.15em', lineHeight: 0, marginRight: -2 }}>›</span>}
    </button>
  );
}
