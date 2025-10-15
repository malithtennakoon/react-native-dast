import React from 'react';
import { View, Text } from 'react-native';
import type {
  BlockNode,
  Paragraph,
  Heading,
  List,
  ListItem,
  Code,
  Blockquote,
  Block,
} from '../types';
import type { StructuredTextStyles } from '../styles';
import { InlineRenderer } from './InlineRenderer';

export interface BlockRendererProps {
  node: BlockNode;
  styles: StructuredTextStyles;
  onLinkPress?: (url: string) => void;
  onItemLinkPress?: (itemId: string) => void;
  renderInlineItem?: (itemId: string) => React.ReactNode;
  renderBlock?: (blockId: string) => React.ReactNode;
}

/**
 * Renders block-level nodes (paragraphs, headings, lists, etc.)
 */
export const BlockRenderer: React.FC<BlockRendererProps> = ({
  node,
  styles,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
  renderBlock,
}) => {
  switch (node.type) {
    case 'paragraph':
      return renderParagraph(node);
    case 'heading':
      return renderHeading(node);
    case 'list':
      return renderList(node);
    case 'code':
      return renderCode(node);
    case 'blockquote':
      return renderBlockquote(node);
    case 'block':
      return renderBlockNode(node);
    case 'thematicBreak':
      return renderThematicBreak();
    default:
      return null;
  }

  function renderParagraph(paragraph: Paragraph) {
    return (
      <View style={styles.paragraph}>
        <Text style={styles.paragraphText}>
          <InlineRenderer
            nodes={paragraph.children}
            styles={styles}
            baseStyle={styles.paragraphText}
            onLinkPress={onLinkPress}
            onItemLinkPress={onItemLinkPress}
            renderInlineItem={renderInlineItem}
          />
        </Text>
      </View>
    );
  }

  function renderHeading(heading: Heading) {
    const containerStyle =
      styles[`heading${heading.level}` as keyof StructuredTextStyles];
    const textStyle =
      styles[`heading${heading.level}Text` as keyof StructuredTextStyles];

    return (
      <View style={containerStyle}>
        <Text style={textStyle}>
          <InlineRenderer
            nodes={heading.children}
            styles={styles}
            baseStyle={textStyle}
            onLinkPress={onLinkPress}
            onItemLinkPress={onItemLinkPress}
            renderInlineItem={renderInlineItem}
          />
        </Text>
      </View>
    );
  }

  function renderList(list: List) {
    const listStyle = [
      styles.list,
      list.style === 'numbered' ? styles.orderedList : styles.unorderedList,
    ].filter(Boolean);

    return (
      <View style={listStyle}>
        {list.children.map((item, index) => (
          <ListItemRenderer
            key={index}
            item={item}
            index={index}
            listStyle={list.style}
            styles={styles}
            onLinkPress={onLinkPress}
            onItemLinkPress={onItemLinkPress}
            renderInlineItem={renderInlineItem}
            renderBlock={renderBlock}
          />
        ))}
      </View>
    );
  }

  function renderCode(code: Code) {
    return (
      <View style={styles.codeBlock}>
        <Text style={styles.codeBlockText}>{code.code}</Text>
      </View>
    );
  }

  function renderBlockquote(blockquote: Blockquote) {
    return (
      <View style={styles.blockquote}>
        <View>
          {blockquote.children.map((child, index) => (
            <BlockRenderer
              key={index}
              node={child}
              styles={styles}
              onLinkPress={onLinkPress}
              onItemLinkPress={onItemLinkPress}
              renderInlineItem={renderInlineItem}
              renderBlock={renderBlock}
            />
          ))}
        </View>
        {blockquote.attribution && (
          <Text style={styles.blockquoteAttribution}>
            — {blockquote.attribution}
          </Text>
        )}
      </View>
    );
  }

  function renderBlockNode(block: Block) {
    if (renderBlock) {
      return <>{renderBlock(block.item)}</>;
    }
    // Default: render nothing if no custom renderer provided
    return null;
  }

  function renderThematicBreak() {
    return <View style={styles.thematicBreak} />;
  }
};

interface ListItemRendererProps {
  item: ListItem;
  index: number;
  listStyle: 'bulleted' | 'numbered';
  styles: StructuredTextStyles;
  onLinkPress?: (url: string) => void;
  onItemLinkPress?: (itemId: string) => void;
  renderInlineItem?: (itemId: string) => React.ReactNode;
  renderBlock?: (blockId: string) => React.ReactNode;
}

const listItemContentStyle = { flex: 1, flexShrink: 1 };

const ListItemRenderer: React.FC<ListItemRendererProps> = ({
  item,
  index,
  listStyle,
  styles,
  onLinkPress,
  onItemLinkPress,
  renderInlineItem,
  renderBlock,
}) => {
  const bullet = listStyle === 'bulleted' ? '•' : `${index + 1}.`;
  const bulletStyle =
    listStyle === 'bulleted' ? styles.listItemBullet : styles.listItemNumber;

  return (
    <View style={styles.listItem}>
      <Text style={bulletStyle}>{bullet}</Text>
      <View style={listItemContentStyle}>
        {item.children.map((child, childIndex) => {
          if (child.type === 'paragraph') {
            // For list items, render paragraph inline without extra margin
            return (
              <Text key={childIndex} style={styles.listItemText}>
                <InlineRenderer
                  nodes={child.children}
                  styles={styles}
                  baseStyle={styles.listItemText}
                  onLinkPress={onLinkPress}
                  onItemLinkPress={onItemLinkPress}
                  renderInlineItem={renderInlineItem}
                />
              </Text>
            );
          } else if (child.type === 'list') {
            // Nested list
            return (
              <BlockRenderer
                key={childIndex}
                node={child}
                styles={styles}
                onLinkPress={onLinkPress}
                onItemLinkPress={onItemLinkPress}
                renderInlineItem={renderInlineItem}
                renderBlock={renderBlock}
              />
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};
