/* @ds-bundle: {"format":3,"namespace":"HelloParkDesignSystem_67d4e9","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CounterPill","sourcePath":"components/core/CounterPill.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"NavBar","sourcePath":"components/core/NavBar.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Button.jsx":"9f65c76a9cfa","components/core/Card.jsx":"6b6722d34ce2","components/core/CounterPill.jsx":"6d33e63f4d61","components/core/IconButton.jsx":"bd6bb1f11a14","components/core/NavBar.jsx":"6c4705a3e9e9","components/core/Tag.jsx":"242485e7ff17"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HelloParkDesignSystem_67d4e9 = window.HelloParkDesignSystem_67d4e9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — Button
 * Pill-shaped, flat. Hover darkens fill; press deepens + nudges down 1px.
 */
function Button({
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
    sm: {
      padding: '8px 16px',
      fontSize: 13
    },
    md: {
      padding: '13px 24px',
      fontSize: 15
    },
    lg: {
      padding: '17px 32px',
      fontSize: 17
    }
  };
  const variants = {
    primary: {
      '--bg': 'var(--orange)',
      '--bgh': 'var(--orange-700)',
      '--bga': 'var(--orange-deep)',
      '--fg': '#fff',
      '--bd': 'transparent'
    },
    secondary: {
      '--bg': 'var(--ink)',
      '--bgh': '#000',
      '--bga': '#000',
      '--fg': '#fff',
      '--bd': 'transparent'
    },
    ghost: {
      '--bg': 'transparent',
      '--bgh': 'var(--orange-50)',
      '--bga': 'var(--orange-100)',
      '--fg': 'var(--ink)',
      '--bd': 'var(--border-strong)'
    },
    amber: {
      '--bg': 'var(--amber)',
      '--bgh': '#F0A800',
      '--bga': '#E59E00',
      '--fg': 'var(--ink)',
      '--bd': 'transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    className: "hp-btn",
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = 'var(--bgh)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'var(--bg)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), children, chevron && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: '1.15em',
      lineHeight: 0,
      marginRight: -2
    }
  }, "\u203A"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — Card
 * Flat surface (hairline, no shadow) or a solid color-filled block.
 * One saturated color per card — never gradients.
 */
function Card({
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
    surface: {
      bg: 'var(--surface)',
      fg: 'var(--text-body)',
      head: 'var(--ink)',
      meta: 'var(--ink-60)',
      border: '1px solid var(--line)'
    },
    orange: {
      bg: 'var(--orange)',
      fg: 'rgba(255,255,255,0.92)',
      head: '#fff',
      meta: 'rgba(255,255,255,0.8)',
      border: 'none'
    },
    dark: {
      bg: 'var(--ink)',
      fg: 'rgba(255,255,255,0.78)',
      head: '#fff',
      meta: 'rgba(255,255,255,0.6)',
      border: 'none'
    },
    lilac: {
      bg: 'var(--play-lilac)',
      fg: 'rgba(24,26,28,0.78)',
      head: 'var(--ink)',
      meta: 'rgba(24,26,28,0.6)',
      border: 'none'
    },
    amber: {
      bg: 'var(--amber)',
      fg: 'rgba(24,26,28,0.82)',
      head: 'var(--ink)',
      meta: 'rgba(24,26,28,0.6)',
      border: 'none'
    }
  };
  const f = fills[variant] || fills.surface;
  const pad = size === 'lg' ? 32 : size === 'sm' ? 20 : 26;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: f.bg,
      color: f.fg,
      border: f.border,
      borderRadius: 'var(--radius-lg)',
      padding: pad,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: f.meta
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: 24,
      lineHeight: 1.1,
      color: f.head,
      margin: 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15.5,
      lineHeight: 1.55
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, action));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/CounterPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — CounterPill
 * Small numeric badge used beside mono nav links and labels.
 */
function CounterPill({
  count = 0,
  tone = 'orange',
  style,
  ...rest
}) {
  const tones = {
    orange: {
      bg: 'var(--orange)',
      fg: '#fff'
    },
    ink: {
      bg: 'var(--ink)',
      fg: '#fff'
    },
    soft: {
      bg: 'var(--orange-100)',
      fg: 'var(--orange-deep)'
    }
  };
  const t = tones[tone] || tones.orange;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), count);
}
Object.assign(__ds_scope, { CounterPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CounterPill.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — IconButton
 * Circular pill, used most often for the chevron "›" affordance.
 */
function IconButton({
  children = '›',
  variant = 'primary',
  size = 'md',
  label = 'Open',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: 36,
    md: 48,
    lg: 60
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    primary: {
      bg: 'var(--orange)',
      bgh: 'var(--orange-700)',
      fg: '#fff',
      bd: 'transparent'
    },
    ink: {
      bg: 'var(--ink)',
      bgh: '#000',
      fg: '#fff',
      bd: 'transparent'
    },
    ghost: {
      bg: 'var(--surface)',
      bgh: 'var(--orange-50)',
      fg: 'var(--ink)',
      bd: 'var(--border-strong)'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) {
        e.currentTarget.style.background = v.bgh;
        e.currentTarget.style.transform = 'translateX(2px)';
      }
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = v.bg;
      e.currentTarget.style.transform = 'translateX(0)';
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      marginTop: '-0.06em'
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — NavBar
 * The floating white pill: logo, mono links (+ optional counters), CTA pill.
 * Shadow is allowed here (one of the only places it is).
 */
function NavBar({
  logoSrc,
  brand = 'hello park',
  links = [],
  cta = 'Visit park',
  onCta,
  activeIndex = 0,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: brand,
    style: {
      height: 26,
      width: 'auto'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 19,
      color: 'var(--ink)',
      letterSpacing: '-0.02em'
    }
  }, brand)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginLeft: 8
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    style: {
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
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--ink)';
    },
    onMouseLeave: e => {
      if (i !== activeIndex) e.currentTarget.style.color = 'var(--ink-60)';
    }
  }, l.label, l.count != null && /*#__PURE__*/React.createElement(__ds_scope.CounterPill, {
    count: l.count,
    tone: "soft"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onCta
  }, cta)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hello Park — Tag
 * Mono-label pill. Solid brand/play fill, or neutral outline.
 */
function Tag({
  children,
  color = 'orange',
  outline = false,
  size = 'md',
  style,
  ...rest
}) {
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
    ink: 'var(--ink)'
  };
  const lightOn = ['amber', 'lime', 'lilac'];
  const fg = lightOn.includes(color) ? 'var(--ink)' : '#fff';
  const bg = palette[color] || palette.orange;
  const sizes = {
    sm: {
      padding: '5px 11px',
      fontSize: 11
    },
    md: {
      padding: '7px 14px',
      fontSize: 12.5
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CounterPill = __ds_scope.CounterPill;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tag = __ds_scope.Tag;

})();
