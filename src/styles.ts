import type { TextStyle, ViewStyle } from 'react-native';

/**
 * Customizable styles for all DAST node types
 * Users can override any of these styles to customize the appearance
 */

export interface StructuredTextStyles {
  // Block-level styles
  paragraph?: ViewStyle;
  paragraphText?: TextStyle;

  heading1?: ViewStyle;
  heading1Text?: TextStyle;
  heading2?: ViewStyle;
  heading2Text?: TextStyle;
  heading3?: ViewStyle;
  heading3Text?: TextStyle;
  heading4?: ViewStyle;
  heading4Text?: TextStyle;
  heading5?: ViewStyle;
  heading5Text?: TextStyle;
  heading6?: ViewStyle;
  heading6Text?: TextStyle;

  // List styles
  list?: ViewStyle;
  orderedList?: ViewStyle;
  unorderedList?: ViewStyle;
  listItem?: ViewStyle;
  listItemText?: TextStyle;
  listItemBullet?: TextStyle;
  listItemNumber?: TextStyle;

  // Code styles
  codeBlock?: ViewStyle;
  codeBlockText?: TextStyle;

  // Blockquote styles
  blockquote?: ViewStyle;
  blockquoteText?: TextStyle;
  blockquoteAttribution?: TextStyle;

  // Thematic break (divider) styles
  thematicBreak?: ViewStyle;

  // Inline text marks
  strong?: TextStyle;
  emphasis?: TextStyle;
  code?: TextStyle;
  underline?: TextStyle;
  strikethrough?: TextStyle;
  highlight?: TextStyle;

  // Link styles
  link?: TextStyle;
}

/**
 * Default styles for the StructuredText component
 */
export const defaultStyles: StructuredTextStyles = {
  // Paragraphs
  paragraph: {
    marginBottom: 16,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },

  // Headings
  heading1: {
    marginTop: 24,
    marginBottom: 16,
  },
  heading1Text: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading2: {
    marginTop: 20,
    marginBottom: 12,
  },
  heading2Text: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading3: {
    marginTop: 16,
    marginBottom: 12,
  },
  heading3Text: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading4: {
    marginTop: 16,
    marginBottom: 8,
  },
  heading4Text: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading5: {
    marginTop: 12,
    marginBottom: 8,
  },
  heading5Text: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading6: {
    marginTop: 12,
    marginBottom: 8,
  },
  heading6Text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#000000',
  },

  // Lists
  list: {
    marginBottom: 16,
  },
  orderedList: {},
  unorderedList: {},
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    flexShrink: 1,
  },
  listItemBullet: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginRight: 8,
    flexShrink: 0,
  },
  listItemNumber: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginRight: 8,
    flexShrink: 0,
  },

  // Code blocks
  codeBlock: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  codeBlockText: {
    fontFamily: 'Courier',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },

  // Blockquote
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#ddd',
    paddingLeft: 16,
    marginLeft: 8,
    marginBottom: 16,
  },
  blockquoteText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    color: '#666',
  },
  blockquoteAttribution: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    color: '#999',
  },

  // Thematic break (divider)
  thematicBreak: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 24,
  },

  // Inline marks
  strong: {
    fontWeight: 'bold',
  },
  emphasis: {
    fontStyle: 'italic',
  },
  code: {
    fontFamily: 'Courier',
    fontSize: 14,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  highlight: {
    backgroundColor: '#ffeb3b',
  },

  // Links
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
};

/**
 * Merges custom styles with default styles
 */
export function mergeStyles(
  customStyles?: Partial<StructuredTextStyles>
): StructuredTextStyles {
  if (!customStyles) {
    return defaultStyles;
  }

  return {
    ...defaultStyles,
    ...customStyles,
  };
}
