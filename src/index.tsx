/**
 * react-native-dast - DatoCMS Structured Text renderer for React Native
 */

// Main component
export { StructuredText } from './StructuredText';
export type { StructuredTextProps } from './StructuredText';

// Types
export type {
  DastDocument,
  DastNode,
  Root,
  BlockNode,
  InlineNode,
  Paragraph,
  Heading,
  List,
  ListItem,
  Code,
  Blockquote,
  Block,
  ThematicBreak,
  Span,
  Link,
  ItemLink,
  InlineItem,
  LineBreak,
  Mark,
} from './types';

// Type guards
export {
  isRoot,
  isParagraph,
  isHeading,
  isList,
  isListItem,
  isCode,
  isBlockquote,
  isBlock,
  isThematicBreak,
  isSpan,
  isLink,
  isItemLink,
  isInlineItem,
  isLineBreak,
} from './types';

// Styles
export type { StructuredTextStyles } from './styles';
export { defaultStyles, mergeStyles } from './styles';
