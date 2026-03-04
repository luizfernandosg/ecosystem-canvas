# Ecosystem Canvas - Design System

## Overview

The Ecosystem Canvas design system is aligned with the quartz-refi-template color schemes, providing consistent visual language across the ReFi ecosystem.

---

## Color System

### Semantic Tokens

All themes provide these semantic color tokens:

| Token | Purpose | Usage |
|-------|---------|-------|
| `light` | Lightest color | Backgrounds, cards |
| `lightgray` | Light gray | Secondary backgrounds |
| `gray` | Medium gray | Borders, inactive text |
| `darkgray` | Dark gray | Secondary text |
| `dark` | Darkest color | Primary text, borders |
| `secondary` | Brand secondary | Accent elements |
| `tertiary` | Brand tertiary | Alternative accents |
| `highlight` | Emphasis color | CTAs, highlights |

### Status Colors

| Status | Color | Usage |
|--------|-------|-------|
| `active` | Green (#10b981) | Active/running items |
| `pending` | Yellow (#f59e0b) | Pending/waiting items |
| `completed` | Blue (#3b82f6) | Finished items |
| `error` | Red (#ef4444) | Errors/blocked items |
| `draft` | Gray (#9ca3af) | Draft/inactive items |
| `archived` | Light gray (#6b7280) | Archived items |

### Flow Colors

| Flow Type | Color | Usage |
|-----------|-------|-------|
| `capital` | Green | Money/funding flows |
| `data` | Blue | Data/information flows |
| `permission` | Purple | Permission/access flows |
| `governance` | Orange | Governance/decision flows |

---

## Typography

### Font Families

```css
--canvas-font-title: var(--theme-title-font)
--canvas-font-body: var(--theme-body-font)
--canvas-font-mono: var(--theme-mono-font)
```

### Font Scales

| Element | Size | Weight |
|---------|------|--------|
| Node Title | 14px | 600 |
| Node Description | 12px | 400 |
| Node Label | 10px | 500 |
| Edge Label | 12px | 600 |
| Toolbar Text | 12px | 500 |

---

## Spacing

### Node Spacing

```css
--canvas-node-gap: var(--theme-node-gap) /* 140-160px */
--canvas-padding: var(--theme-padding) /* 12-16px */
```

### Edge Spacing

```css
--canvas-edge-radius: var(--theme-edge-radius) /* 0-12px */
```

---

## Borders

### Border Width

```css
--canvas-border-width: var(--theme-border-width) /* 2px */
```

### Border Radius

```css
--canvas-border-radius: var(--theme-border-radius) /* 0-8px */
```

Different themes have different border aesthetics:
- **DAOcore & Ocean**: Sharp (0px radius)
- **Functional, Regen, Forest**: Rounded (8px radius)

---

## Themes

### Functional Theme

**Aesthetic**: Clean, minimal, modern

**Colors**:
- Light: `#ffffff`
- Dark: `#1f2937`
- Secondary: `#6366f1` (Indigo)
- Highlight: `#3b82f6` (Blue)

**Typography**:
- System UI fonts

**Best For**: General-purpose visualizations, technical documentation

---

### DAOcore Theme

**Aesthetic**: Bold, expressive, geometric

**Colors**:
- Light: `#ffffff`
- Dark: `#111827`
- Secondary: `#ec4899` (Pink)
- Highlight: `#f59e0b` (Amber)

**Typography**:
- System UI fonts

**Borders**:
- Sharp corners (0px radius)
- Bold lines (2px)

**Best For**: DAO OS integration, governance visualizations

---

### Regen Theme

**Aesthetic**: Earth tones, organic, warm

**Colors**:
- Light: `#fefefe`
- Dark: `#292524` (Stone)
- Secondary: `#84cc16` (Lime)
- Highlight: `#22c55e` (Green)

**Typography**:
- Serif titles
- Sans body

**Best For**: Regenerative finance, sustainability projects

---

### Ocean Theme (ReFi Barcelona)

**Aesthetic**: Navy blue + warm sand, bold

**Colors**:
- Light: `#E6DFD7` (Warm sand)
- Dark: `#0f172a` (Navy)
- Secondary: `#0ea5e9` (Sky)
- Highlight: `#06b6d4` (Cyan)

**Typography**:
- System UI fonts

**Borders**:
- Sharp corners (0px radius)
- Strong lines (2px)

**Best For**: ReFi BCN projects, Mediterranean nodes

---

### Forest Theme (Regenerant Catalunya)

**Aesthetic**: Green tones, earthy, natural

**Colors**:
- Light: `#f7f7f5`
- Dark: `#1a2e1f`
- Secondary: `#4d7c0f` (Green-700)
- Highlight: `#84cc16` (Lime)

**Typography**:
- Serif titles
- Sans body

**Best For**: Regenerant Catalunya, forest-focused projects

---

## Node Design Patterns

### Fund Flow Nodes

```
┌─────────────────────┐
│ 🏛️  Funder Name    │  ← Icon + Title
│ DAO Type           │  ← Subtitle
├─────────────────────┤
│ $5.0M Total        │  ← Primary metric
│ 12 Programs        │  ← Secondary metric
├─────────────────────┤
│ ● Active Funder    │  ← Status indicator
└─────────────────────┘
```

### Organization Nodes

```
┌─────────────────────┐
│ Organization       │  ← Title
│ Identity           │  ← EIP-4824 info
├─────────────────────┤
│ Members: 45        │  ← Stats
│ Teams: 8           │
└─────────────────────┘
```

### Learning Path Nodes

```
┌─────────────────────┐
│ 📚 Module Name     │  ← Icon + Title
│ Intermediate       │  ← Difficulty
├─────────────────────┤
│ ▓▓▓▓▓▓▓▓░░ 80%    │  ← Progress bar
└─────────────────────┘
```

---

## Edge Design Patterns

### Capital Flow Edge

```
[Funder] ──$50K──> [Program]
          ⚡ Active
```

- Animated particles for active flows
- Amount label in center
- Color-coded by status

### Permission Edge

```
[Role] ─────────> [Module]
     Permission: Write
```

- Dashed line for permissions
- Label shows permission type
- Purple theme color

### Semantic Edge

```
[Concept A] ─────> [Concept B]
          Related: 0.85
```

- Thickness = relationship strength
- Blue theme color
- Optional strength label

---

## Animation Guidelines

### Node Animations

```css
/* Hover */
transition: transform 200ms ease, box-shadow 200ms ease;
transform: translateY(-2px);
box-shadow: 0 10px 30px rgba(0,0,0,0.1);

/* Selection */
ring: 2px solid var(--highlight);
```

### Edge Animations

```css
/* Capital flow */
animation: flow 2s linear infinite;

/* Data pulse */
animation: pulse 1.5s ease-in-out infinite;
```

### Overlay Animations

```css
/* Fade in */
animation: fadeIn 300ms ease;

/* Slide in */
animation: slideIn 400ms cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  --canvas-node-gap: 100px;
  --canvas-padding: 8px;
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  --canvas-node-gap: 130px;
  --canvas-padding: 12px;
}

/* Desktop */
@media (min-width: 1025px) {
  --canvas-node-gap: 150px;
  --canvas-padding: 14px;
}
```

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### Keyboard Navigation

- `Tab`: Navigate nodes
- `Arrow keys`: Move selected node
- `Delete`: Remove node
- `Escape`: Deselect

### Screen Reader Support

All nodes include ARIA labels:

```tsx
<div
  role="button"
  aria-label={`${data.name}, ${data.type}, ${status}`}
  tabIndex={0}
>
  {/* Node content */}
</div>
```

---

## Usage in CSS

### CSS Variables

All theme values are available as CSS variables:

```css
.custom-node {
  background: var(--canvas-color-light);
  border: var(--canvas-border-width) solid var(--canvas-color-border);
  border-radius: var(--canvas-border-radius);
  padding: var(--canvas-padding);
  font-family: var(--canvas-font-body);
}

.custom-edge {
  stroke: var(--canvas-color-capital);
  stroke-width: 2px;
}
```

### Tailwind Classes

For TailwindCSS users, map theme colors:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: {
          light: 'var(--canvas-color-light)',
          dark: 'var(--canvas-color-dark)',
          // ... all theme colors
        },
      },
    },
  },
};
```

---

## Design Resources

### Figma Templates

(To be created)

### Icon Sets

Recommended icon libraries:
- **Lucide React** (modern, consistent)
- **Heroicons** (Tailwind-aligned)
- **Phosphor Icons** (versatile)

---

**Last Updated**: 2026-01-31
**Version**: 0.1.0
