# Embedding Ecosystem Canvas

The Ecosystem Canvas Explorer can be embedded as an iframe in ReFi DAO, Regen Coordination, or other websites.

## Embed URLs

- **Integrations Canvas**: `https://your-domain.com/embed/integrations`
- **Fund Flows Canvas**: `https://your-domain.com/embed/fund-flows`

## Basic Embed

```html
<iframe
  src="https://your-domain.com/embed/integrations"
  width="100%"
  height="600"
  frameborder="0"
  title="Ecosystem Canvas - Integrations"
></iframe>
```

## PostMessage API

When embedded in an iframe, the canvas communicates with the parent window via `postMessage`.

### Events from Canvas (child → parent)

| Type | Payload | Description |
|------|---------|-------------|
| `ECOSYSTEM_READY` | `{ theme, nodeCount, edgeCount }` | Fired when canvas has loaded |
| `ECOSYSTEM_NODE_CLICK` | `{ nodeId, data }` | Fired when user clicks a node |

### Commands to Canvas (parent → child)

| Type | Payload | Description |
|------|---------|-------------|
| `ECOSYSTEM_SET_THEME` | `{ theme: 'regen' \| 'functional' \| 'daocore' }` | Change canvas theme |

### Example: Listen for node clicks

```javascript
window.addEventListener('message', (event) => {
  if (event.data?.type === 'ECOSYSTEM_NODE_CLICK') {
    const { nodeId, data } = event.data.payload;
    console.log('Node clicked:', nodeId, data);
    // e.g. navigate to toolkit article: window.location = `/articles/${nodeId}`;
  }
});
```

### Example: Change theme from parent

```javascript
const iframe = document.getElementById('ecosystem-canvas');
iframe.contentWindow?.postMessage({
  type: 'ECOSYSTEM_SET_THEME',
  payload: { theme: 'daocore' },
  timestamp: Date.now()
}, '*');
```

## Quartz / Static Sites

For Quartz-based sites (ReFi DAO, Regen Coordination):

1. Deploy the explorer app to a subpath (e.g. `https://refidao.com/canvas/`)
2. Embed: `<iframe src="https://refidao.com/canvas/embed/integrations" ...></iframe>`
3. Ensure the iframe has sufficient height (min 400px recommended)

## Responsive Sizing

The canvas adapts to container size. Use CSS to make the iframe responsive:

```css
.ecosystem-embed {
  width: 100%;
  aspect-ratio: 16 / 10;
  min-height: 400px;
}
```
