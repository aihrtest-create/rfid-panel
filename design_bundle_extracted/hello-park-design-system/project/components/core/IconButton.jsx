import React from 'react';

/**
 * Hello Park — IconButton
 * Circular pill, used most often for the chevron "›" affordance.
 */
export function IconButton({
  children = '›',
  variant = 'primary',
  size = 'md',
  label = 'Open',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = { sm: 36, md: 48, lg: 60 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    primary: { bg: 'var(--orange)', bgh: 'var(--orange-700)', fg: '#fff', bd: 'transparent' },
    ink: { bg: 'var(--ink)', bgh: '#000', fg: '#fff', bd: 'transparent' },
    ghost: { bg: 'var(--surface)', bgh: 'var(--orange-50)', fg: 'var(--ink)', bd: 'var(--border-strong)' },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: dim,
        height: dim,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1.5px solid ${v.bd}`,
        background: v.bg,
        color: v.fg,
        borderRadius: 'var(--radius-pill)',
        fontSize: dim * 0.5,
        lineHeight: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.background = v.bgh; e.currentTarget.style.transform = 'translateX(2px)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.bg; e.currentTarget.style.transform = 'translateX(0)'; }}
      {...rest}
    >
      <span aria-hidden="true" style={{ marginTop: '-0.06em' }}>{children}</span>
    </button>
  );
}
