import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { DastDocument, Root } from './types';
import type { StructuredTextStyles } from './styles';
import { mergeStyles } from './styles';
import { BlockRenderer } from './renderers/BlockRenderer';

export interface StructuredTextProps {
  /**
   * The DAST document to render
   */
  data: DastDocument | Root;

  /**
   * Custom styles to override default styles
   */
  customStyles?: Partial<StructuredTextStyles>;

  /**
   * Container style for the root view
   */
  style?: ViewStyle;

  /**
   * Custom handler for link presses
   * If not provided, links will open in the default browser
   */
  onLinkPress?: (url: string) => void;

  /**
   * Custom handler for item link presses (links to DatoCMS records)
   */
  onItemLinkPress?: (itemId: string) => void;

  /**
   * Custom renderer for inline items (inline DatoCMS records)
   * Should return a React element to render inline within text
   */
  renderInlineItem?: (itemId: string) => React.ReactNode;

  /**
   * Custom renderer for block items (embedded DatoCMS records)
   * Should return a React element to render as a block
   */
  renderBlock?: (blockId: string) => React.ReactNode;
}

/**
 * Main component for rendering DatoCMS Structured Text (DAST format)
 *
 * @example
 * ```tsx
 * import { StructuredText } from 'react-native-dast';
 *
 * const data = {
 *   type: 'root',
 *   children: [
 *     {
 *       type: 'paragraph',
 *       children: [
 *         { type: 'span', value: 'Hello ' },
 *         { type: 'span', marks: ['strong'], value: 'world' },
 *         { type: 'span', value: '!' }
 *       ]
 *     }
 *   ]
 * };
 *
 * <StructuredText
 *   data={data}
 *   customStyles={{
 *     paragraphText: { fontSize: 18 },
 *     strong: { color: 'red' }
 *   }}
 * />
 * ```
 */
export const StructuredText: React.FC<StructuredTextProps> = ({
  data,
  customStyles,
  style,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
  renderBlock,
}) => {
  const styles = mergeStyles(customStyles);

  if (!data || data.type !== 'root') {
    console.warn('StructuredText: Invalid data provided. Expected root node.');
    return null;
  }

  return (
    <View style={style}>
      {data.children.map((node, index) => (
        <BlockRenderer
          key={index}
          node={node}
          styles={styles}
          onLinkPress={onLinkPress}
          onItemLinkPress={onItemLinkPress}
          renderInlineItem={renderInlineItem}
          renderBlock={renderBlock}
        />
      ))}
    </View>
  );
};
