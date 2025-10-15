/**
 * DatoCMS DAST (DatoCMS Abstract Syntax Tree) Type Definitions
 * Based on: https://www.datocms.com/docs/structured-text/dast
 */

// ============================================================================
// Mark Types (for text decoration)
// ============================================================================

export type Mark =
  | 'strong'
  | 'emphasis'
  | 'code'
  | 'underline'
  | 'strikethrough'
  | 'highlight';

// ============================================================================
// Base Node
// ============================================================================

export interface BaseNode {
  type: string;
}

// ============================================================================
// Inline Nodes
// ============================================================================

export interface Span extends BaseNode {
  type: 'span';
  value: string;
  marks?: Mark[];
}

export interface Link extends BaseNode {
  type: 'link';
  url: string;
  meta?: Array<{ id: string; value: string }>;
  children: InlineNode[];
}

export interface ItemLink extends BaseNode {
  type: 'itemLink';
  item: string; // ID of the linked record
  meta?: Array<{ id: string; value: string }>;
  children: InlineNode[];
}

export interface InlineItem extends BaseNode {
  type: 'inlineItem';
  item: string; // ID of the referenced record
}

export interface LineBreak extends BaseNode {
  type: 'lineBreak';
}

export type InlineNode = Span | Link | ItemLink | InlineItem | LineBreak;

// ============================================================================
// Block Nodes
// ============================================================================

export interface Paragraph extends BaseNode {
  type: 'paragraph';
  children: InlineNode[];
}

export interface Heading extends BaseNode {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

export interface List extends BaseNode {
  type: 'list';
  style: 'bulleted' | 'numbered';
  children: ListItem[];
}

export interface ListItem extends BaseNode {
  type: 'listItem';
  children: (Paragraph | List)[];
}

export interface Code extends BaseNode {
  type: 'code';
  code: string;
  language?: string;
  highlight?: number[];
}

export interface Blockquote extends BaseNode {
  type: 'blockquote';
  attribution?: string;
  children: BlockNode[];
}

export interface Block extends BaseNode {
  type: 'block';
  item: string; // ID of the embedded record
}

export interface ThematicBreak extends BaseNode {
  type: 'thematicBreak';
}

export type BlockNode =
  | Paragraph
  | Heading
  | List
  | Code
  | Blockquote
  | Block
  | ThematicBreak;

// ============================================================================
// Root Node
// ============================================================================

export interface Root extends BaseNode {
  type: 'root';
  children: BlockNode[];
}

// ============================================================================
// Document Type (what users will pass to the component)
// ============================================================================

export type DastDocument = Root;

export type DastNode = Root | BlockNode | ListItem | InlineNode;

// ============================================================================
// Utility Types
// ============================================================================

export type WithChildren<T extends BaseNode> = T & {
  children: DastNode[];
};

export function isRoot(node: DastNode): node is Root {
  return node.type === 'root';
}

export function isParagraph(node: DastNode): node is Paragraph {
  return node.type === 'paragraph';
}

export function isHeading(node: DastNode): node is Heading {
  return node.type === 'heading';
}

export function isList(node: DastNode): node is List {
  return node.type === 'list';
}

export function isListItem(node: DastNode): node is ListItem {
  return node.type === 'listItem';
}

export function isCode(node: DastNode): node is Code {
  return node.type === 'code';
}

export function isBlockquote(node: DastNode): node is Blockquote {
  return node.type === 'blockquote';
}

export function isBlock(node: DastNode): node is Block {
  return node.type === 'block';
}

export function isThematicBreak(node: DastNode): node is ThematicBreak {
  return node.type === 'thematicBreak';
}

export function isSpan(node: DastNode): node is Span {
  return node.type === 'span';
}

export function isLink(node: DastNode): node is Link {
  return node.type === 'link';
}

export function isItemLink(node: DastNode): node is ItemLink {
  return node.type === 'itemLink';
}

export function isInlineItem(node: DastNode): node is InlineItem {
  return node.type === 'inlineItem';
}

export function isLineBreak(node: DastNode): node is LineBreak {
  return node.type === 'lineBreak';
}
