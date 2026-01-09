# North Project - Design Studio

Brutalist, editorial, racing team website with live component preview and configuration system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the design studio.

## Studio Features

### Multi-Section Studio
- Switch between multiple sections using tabs
- Each section can have multiple variants
- Config persistence via localStorage
- Live preview with animations

### Config Editor
- Recursive JSON editor for nested configs
- Basic and Advanced tabs
- Auto-detects field types (text, textarea, number, array, object)
- Real-time updates

### Variant Switcher
- Top-center variant selector
- Shows variant name, mood, and background type
- Numbered badges
- Smooth transitions

### Toolbar
- **SHOW/HIDE EDITOR**: Toggle config panel
- **SHOW/HIDE GRID**: Toggle 40px grid overlay
- **COPY**: Copy current config to clipboard
- **EXPORT**: Download config as JSON file
- **RESET**: Reset to initial config

## Adding New Sections

Edit `app/studio/page.tsx` and add sections to the `exampleSections` array:

```typescript
{
  id: 'section-id',
  name: 'Section Name',
  initialConfig: {
    title: 'Default Title',
    // ... other config fields
  },
  variants: [
    {
      id: 'variant-1',
      name: 'Variant Name',
      mood: 'Brutalist',
      background: 'black',
    },
  ],
  component: ({ config, activeVariant }) => {
    // Your component JSX here
    return <section>...</section>;
  },
}
```

## Design System

- **Colors**: Black (#000000), White (#FFFFFF), Gray (#808080)
- **Typography**: PP Neue Montreal
- **Aesthetic**: Brutalist, sharp edges, no rounded corners
- **Animations**: Framer Motion

## Project Structure

```
├── app/
│   ├── studio/
│   │   └── page.tsx          # Studio route
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/
│   └── dev/
│       ├── config-editor.tsx      # Recursive JSON editor
│       ├── multi-section-studio.tsx # Multi-section orchestrator
│       ├── section-studio.tsx      # Single-section version
│       └── variant-switcher.tsx    # Variant selector
└── lib/
    ├── config-utils.ts        # Config utilities
    └── types.ts               # TypeScript types
```

## Config Persistence

Configs are automatically saved to localStorage with keys:
- `north-project-config-${sectionId}`

Configs persist across page refreshes.

