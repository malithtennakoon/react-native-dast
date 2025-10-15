# react-native-dast

[![npm version](https://img.shields.io/npm/v/react-native-dast.svg)](https://www.npmjs.com/package/react-native-dast)
[![npm downloads](https://img.shields.io/npm/dm/react-native-dast.svg)](https://www.npmjs.com/package/react-native-dast)
[![license](https://img.shields.io/npm/l/react-native-dast.svg)](https://github.com/malithtennakoon/react-native-dast/blob/main/LICENSE)

A React Native library for rendering DatoCMS Structured Text (DAST) with full TypeScript support and customizable styles.

## Features

- ✅ **Full DAST Support** - Renders all DatoCMS Structured Text node types
- 🎨 **Fully Customizable** - Override any style for complete control over appearance
- 📘 **TypeScript First** - Written in TypeScript with comprehensive type definitions
- 🧪 **Well Tested** - Comprehensive test coverage
- 🔗 **Custom Renderers** - Support for custom link, block, and inline item renderers
- 📱 **React Native Only** - Uses only React Native components (Text, View, etc.)
- 🚀 **Expo Compatible** - Works seamlessly with Expo

## Installation

```sh
npm install react-native-dast
# or
yarn add react-native-dast
```

## Usage

### Basic Usage

```tsx
import { StructuredText } from 'react-native-dast';

const data = {
  type: 'root',
  children: [
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'Hello ' },
        { type: 'span', marks: ['strong'], value: 'world' },
        { type: 'span', value: '!' }
      ]
    }
  ]
};

function App() {
  return <StructuredText data={data} />;
}
```

### Custom Styles

You can customize any style by passing a `customStyles` prop:

```tsx
<StructuredText
  data={data}
  customStyles={{
    // Paragraph styles
    paragraphText: {
      fontSize: 18,
      lineHeight: 28,
      color: '#333',
    },

    // Heading styles
    heading1Text: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#000',
    },

    // Text marks
    strong: {
      fontWeight: '700',
      color: '#e74c3c',
    },

    emphasis: {
      fontStyle: 'italic',
      color: '#3498db',
    },

    // List styles
    listItemText: {
      fontSize: 16,
      lineHeight: 26,
    },

    // Link styles
    link: {
      color: '#3498db',
      textDecorationLine: 'underline',
    },

    // Code block styles
    codeBlockText: {
      fontFamily: 'Courier',
      fontSize: 14,
    },
  }}
/>
```

### Custom Link Handler

```tsx
<StructuredText
  data={data}
  onLinkPress={(url) => {
    // Handle link press
    console.log('Link pressed:', url);
    // You can use Linking, navigation, etc.
  }}
/>
```

### Custom Renderers

```tsx
<StructuredText
  data={data}
  // Custom renderer for DatoCMS blocks
  renderBlock={(blockId) => {
    return <CustomBlockComponent id={blockId} />;
  }}

  // Custom renderer for inline items
  renderInlineItem={(itemId) => {
    return <CustomInlineComponent id={itemId} />;
  }}

  // Custom handler for item links
  onItemLinkPress={(itemId) => {
    console.log('Item link pressed:', itemId);
  }}
/>
```

## Supported Node Types

### Block Nodes
- **paragraph** - Text paragraphs
- **heading** - Headings (levels 1-6)
- **list** - Ordered and unordered lists
- **code** - Code blocks
- **blockquote** - Block quotations
- **block** - Embedded DatoCMS records
- **thematicBreak** - Horizontal dividers

### Inline Nodes
- **span** - Text with optional marks (strong, emphasis, code, underline, strikethrough, highlight)
- **link** - Hyperlinks
- **itemLink** - Links to DatoCMS records
- **inlineItem** - Inline DatoCMS records
- **lineBreak** - Line breaks

## API Reference

### `<StructuredText>` Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `DastDocument` | The DAST document to render (required) |
| `customStyles` | `Partial<StructuredTextStyles>` | Custom styles to override defaults |
| `style` | `ViewStyle` | Container style for the root view |
| `onLinkPress` | `(url: string) => void` | Custom link press handler |
| `onItemLinkPress` | `(itemId: string) => void` | Custom item link press handler |
| `renderBlock` | `(blockId: string) => ReactNode` | Custom renderer for block items |
| `renderInlineItem` | `(itemId: string) => ReactNode` | Custom renderer for inline items |

### Available Style Keys

See [src/styles.ts](src/styles.ts) for all available style keys. Key categories include:

- `paragraph`, `paragraphText`
- `heading1` through `heading6`, `heading1Text` through `heading6Text`
- `list`, `orderedList`, `unorderedList`, `listItem`, `listItemText`, `listItemBullet`, `listItemNumber`
- `codeBlock`, `codeBlockText`
- `blockquote`, `blockquoteText`, `blockquoteAttribution`
- `thematicBreak`
- `strong`, `emphasis`, `code`, `underline`, `strikethrough`, `highlight`
- `link`

## TypeScript

The library is written in TypeScript and exports all types:

```tsx
import type {
  DastDocument,
  DastNode,
  Paragraph,
  Heading,
  StructuredTextStyles,
  // ... and more
} from 'react-native-dast';
```

## Examples

Check out the [example](example) folder for a complete working example with Expo.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
