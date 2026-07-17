import React from 'react';
import { CounterPill } from './CounterPill.jsx';
import { Button } from './Button.jsx';

/**
 * Hello Park — NavBar
 * The floating white pill: logo, mono links (+ optional counters), CTA pill.
 * Shadow is allowed here (one of the only places it is).
 */
export function NavBar({
  logoSrc,
  brand = 'hello park',
  links = [],
  cta = 'Visit park',
  onCta,
  activeIndex = 0,
  style,
  ...rest
}) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        background: 'rgba(255,255,255,0.86)',
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-nav)',
        borderRadius: 'var(--radius-pill)',
        padding: '10px 12px 10px 20px',
        ...style,
      }}
      {...rest}
    >
      <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {logoSrc
          ? <img src={logoSrc} alt={brand} style={{ height: 26, width: 'auto' }} />
          : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{brand}</span>}
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href || '#'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              fontSize: 12.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: i === activeIndex ? 'var(--ink)' : 'var(--ink-60)',
              background: i === activeIndex ? 'var(--page)' : 'transparent',
              transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { if (i !== activeIndex) e.currentTarget.style.color = 'var(--ink-60)'; }}
          >
            {l.label}
            {l.count != null && <CounterPill count={l.count} tone="soft" />}
          </a>
        ))}
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <Button variant="primary" size="sm" onClick={onCta}>{cta}</Button>
      </div>
    </nav>
  );
}
