The floating white pill navigation — logo, uppercase mono links with optional counters, and a CTA pill. One of the only components allowed to cast a shadow.

```jsx
<NavBar
  logoSrc="assets/logo-horizontal.png"
  links={[
    { label: 'Attractions', count: 12 },
    { label: 'Franchise' },
    { label: 'About' },
  ]}
  cta="Visit park"
  activeIndex={0}
/>
```

Composes `CounterPill` + `Button`. Pass `logoSrc` relative to the page; omit for a wordmark fallback.
