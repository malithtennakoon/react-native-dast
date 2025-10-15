import React from 'react';
import { Text, Linking } from 'react-native';
import type { TextStyle } from 'react-native';
import type { InlineNode, Link, ItemLink, Mark } from '../types';
import type { StructuredTextStyles } from '../styles';

export interface InlineRendererProps {
  nodes: InlineNode[];
  styles: StructuredTextStyles;
  baseStyle?: TextStyle;
  onLinkPress?: (url: string) => void;
  onItemLinkPress?: (itemId: string) => void;
  renderInlineItem?: (itemId: string) => React.ReactNode;
}

// Helper component for rendering links
const LinkComponent: React.FC<{
  node: Link;
  index: number;
  baseStyle?: TextStyle;
  styles: StructuredTextStyles;
  onLinkPress?: (url: string) => void;
  onItemLinkPress?: (itemId: string) => void;
  renderInlineItem?: (itemId: string) => React.ReactNode;
}> = ({
  node,
  index,
  baseStyle,
  styles,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
}) => {
  const handlePress = () => {
    if (onLinkPress) {
      onLinkPress(node.url);
    } else {
      Linking.openURL(node.url).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  const linkStyle = [baseStyle, styles.link].filter(Boolean);

  const flattenedLinkStyle: TextStyle = Object.assign(
    {},
    ...(linkStyle as TextStyle[])
  );

  return (
    <Text key={index} style={linkStyle} onPress={handlePress}>
      <InlineRenderer
        nodes={node.children}
        styles={styles}
        baseStyle={flattenedLinkStyle}
        onLinkPress={onLinkPress}
        onItemLinkPress={onItemLinkPress}
        renderInlineItem={renderInlineItem}
      />
    </Text>
  );
};

// Helper component for rendering item links
const ItemLinkComponent: React.FC<{
  node: ItemLink;
  index: number;
  baseStyle?: TextStyle;
  styles: StructuredTextStyles;
  onLinkPress?: (url: string) => void;
  onItemLinkPress?: (itemId: string) => void;
  renderInlineItem?: (itemId: string) => React.ReactNode;
}> = ({
  node,
  index,
  baseStyle,
  styles,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
}) => {
  const handlePress = () => {
    if (onItemLinkPress) {
      onItemLinkPress(node.item);
    }
  };

  const linkStyle = [baseStyle, styles.link].filter(Boolean);

  const flattenedLinkStyle: TextStyle = Object.assign(
    {},
    ...(linkStyle as TextStyle[])
  );

  return (
    <Text key={index} style={linkStyle} onPress={handlePress}>
      <InlineRenderer
        nodes={node.children}
        styles={styles}
        baseStyle={flattenedLinkStyle}
        onLinkPress={onLinkPress}
        onItemLinkPress={onItemLinkPress}
        renderInlineItem={renderInlineItem}
      />
    </Text>
  );
};

/**
 * Renders inline nodes (spans, links, line breaks, etc.)
 */
export const InlineRenderer: React.FC<InlineRendererProps> = ({
  nodes,
  styles,
  baseStyle,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
}) => {
  const getMarkStyles = (marks?: Mark[]): TextStyle => {
    if (!marks || marks.length === 0) return {};

    return marks.reduce((acc, mark) => {
      const markStyle = styles[mark];
      return markStyle ? { ...acc, ...markStyle } : acc;
    }, {} as TextStyle);
  };

  const renderNode = (node: InlineNode, index: number): React.ReactNode => {
    switch (node.type) {
      case 'span': {
        const markStyles = getMarkStyles(node.marks);
        const combinedStyle = [baseStyle, markStyles];
        return (
          <Text key={index} style={combinedStyle}>
            {node.value}
          </Text>
        );
      }
      case 'link':
        return (
          <LinkComponent
            key={index}
            node={node}
            index={index}
            baseStyle={baseStyle}
            styles={styles}
            onLinkPress={onLinkPress}
            onItemLinkPress={onItemLinkPress}
            renderInlineItem={renderInlineItem}
          />
        );
      case 'itemLink':
        return (
          <ItemLinkComponent
            key={index}
            node={node}
            index={index}
            baseStyle={baseStyle}
            styles={styles}
            onLinkPress={onLinkPress}
            onItemLinkPress={onItemLinkPress}
            renderInlineItem={renderInlineItem}
          />
        );
      case 'inlineItem':
        if (renderInlineItem) {
          return (
            <React.Fragment key={index}>
              {renderInlineItem(node.item)}
            </React.Fragment>
          );
        }
        return null;
      case 'lineBreak':
        return '\n';
      default:
        return null;
    }
  };

  return <>{nodes.map((node, index) => renderNode(node, index))}</>;
};
