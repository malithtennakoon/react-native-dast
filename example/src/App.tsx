import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { StructuredText } from 'react-native-dast';
import type { DastDocument } from 'react-native-dast';

const exampleData: DastDocument = {
  type: 'root',
  children: [
    // ========== HEADINGS ==========
    {
      type: 'heading',
      level: 1,
      children: [
        { type: 'span', value: 'DatoCMS Structured Text - Complete Demo' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value:
            'This example demonstrates all possible DAST node types and formatting options available in the react-native-dast library.',
        },
      ],
    },

    // ========== ALL HEADING LEVELS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Heading Level 2' }],
    },
    {
      type: 'heading',
      level: 3,
      children: [{ type: 'span', value: 'Heading Level 3' }],
    },
    {
      type: 'heading',
      level: 4,
      children: [{ type: 'span', value: 'Heading Level 4' }],
    },
    {
      type: 'heading',
      level: 5,
      children: [{ type: 'span', value: 'Heading Level 5' }],
    },
    {
      type: 'heading',
      level: 6,
      children: [{ type: 'span', value: 'Heading Level 6' }],
    },

    // ========== PARAGRAPHS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Paragraphs' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value:
            'This is a simple paragraph. Paragraphs are the most basic block-level element in DatoCMS Structured Text.',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value:
            'Multiple paragraphs can follow each other, and they will be properly spaced according to the default or custom styles.',
        },
      ],
    },

    // ========== TEXT MARKS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Text Formatting Marks' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'Individual marks: ' },
        { type: 'span', marks: ['strong'], value: 'Bold text' },
        { type: 'span', value: ', ' },
        { type: 'span', marks: ['emphasis'], value: 'Italic text' },
        { type: 'span', value: ', ' },
        { type: 'span', marks: ['code'], value: 'Inline code' },
        { type: 'span', value: ', ' },
        { type: 'span', marks: ['underline'], value: 'Underlined text' },
        { type: 'span', value: ', ' },
        {
          type: 'span',
          marks: ['strikethrough'],
          value: 'Strikethrough text',
        },
        { type: 'span', value: ', and ' },
        { type: 'span', marks: ['highlight'], value: 'Highlighted text' },
        { type: 'span', value: '.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'Combined marks: ' },
        {
          type: 'span',
          marks: ['strong', 'emphasis'],
          value: 'Bold and italic',
        },
        { type: 'span', value: ', ' },
        {
          type: 'span',
          marks: ['strong', 'underline'],
          value: 'Bold and underlined',
        },
        { type: 'span', value: ', ' },
        {
          type: 'span',
          marks: ['emphasis', 'code'],
          value: 'Italic code',
        },
        { type: 'span', value: ', ' },
        {
          type: 'span',
          marks: ['strong', 'emphasis', 'underline'],
          value: 'All three combined',
        },
        { type: 'span', value: '.' },
      ],
    },

    // ========== LINKS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Links' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'This is a paragraph with a ' },
        {
          type: 'link',
          url: 'https://www.datocms.com',
          children: [{ type: 'span', value: 'simple link' }],
        },
        { type: 'span', value: ' to DatoCMS.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'Links can also have ' },
        {
          type: 'link',
          url: 'https://www.example.com',
          children: [{ type: 'span', marks: ['strong'], value: 'bold text' }],
        },
        { type: 'span', value: ' or ' },
        {
          type: 'link',
          url: 'https://www.example.com',
          children: [
            { type: 'span', marks: ['emphasis'], value: 'italic text' },
          ],
        },
        { type: 'span', value: ' or even ' },
        {
          type: 'link',
          url: 'https://www.example.com',
          children: [
            {
              type: 'span',
              marks: ['strong', 'emphasis'],
              value: 'both combined',
            },
          ],
        },
        { type: 'span', value: '.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'link',
          url: 'https://reactnative.dev',
          children: [{ type: 'span', value: 'React Native Documentation' }],
        },
        { type: 'span', value: ' - A link at the start of a paragraph.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'A link at the end of a paragraph - ' },
        {
          type: 'link',
          url: 'https://github.com',
          children: [{ type: 'span', value: 'GitHub' }],
        },
      ],
    },

    // ========== LISTS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Lists' }],
    },
    {
      type: 'heading',
      level: 3,
      children: [{ type: 'span', value: 'Unordered (Bulleted) Lists' }],
    },
    {
      type: 'list',
      style: 'bulleted',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'First bullet item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Second bullet item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'span', value: 'Item with ' },
                { type: 'span', marks: ['strong'], value: 'bold' },
                { type: 'span', value: ' and ' },
                { type: 'span', marks: ['emphasis'], value: 'italic' },
                { type: 'span', value: ' text' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'span', value: 'Item with a ' },
                {
                  type: 'link',
                  url: 'https://www.datocms.com',
                  children: [{ type: 'span', value: 'link inside' }],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'heading',
      level: 3,
      children: [{ type: 'span', value: 'Ordered (Numbered) Lists' }],
    },
    {
      type: 'list',
      style: 'numbered',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'First numbered item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Second numbered item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Third numbered item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'span', value: 'Fourth item with ' },
                { type: 'span', marks: ['code'], value: 'inline code' },
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'heading',
      level: 3,
      children: [{ type: 'span', value: 'Nested Lists' }],
    },
    {
      type: 'list',
      style: 'bulleted',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Parent item 1' }],
            },
            {
              type: 'list',
              style: 'bulleted',
              children: [
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'span', value: 'Child item 1.1' }],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'span', value: 'Child item 1.2' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Parent item 2' }],
            },
            {
              type: 'list',
              style: 'numbered',
              children: [
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'span', value: 'Numbered child 2.1' }],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'span', value: 'Numbered child 2.2' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'Parent item 3' }],
            },
          ],
        },
      ],
    },

    // ========== CODE BLOCKS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Code Blocks' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value: 'Code blocks can display multi-line code snippets:',
        },
      ],
    },
    {
      type: 'code',
      code: 'import { StructuredText } from "react-native-dast";\nimport type { DastDocument } from "react-native-dast";\n\nconst data: DastDocument = {\n  type: "root",\n  children: [\n    {\n      type: "paragraph",\n      children: [{ type: "span", value: "Hello World" }]\n    }\n  ]\n};\n\nexport default function App() {\n  return <StructuredText data={data} />;\n}',
      language: 'typescript',
    },
    {
      type: 'paragraph',
      children: [{ type: 'span', value: 'Another code example with JSON:' }],
    },
    {
      type: 'code',
      code: '{\n  "name": "react-native-dast",\n  "version": "0.1.0",\n  "description": "DatoCMS Structured Text renderer"\n}',
      language: 'json',
    },

    // ========== BLOCKQUOTES ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Blockquotes' }],
    },
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'span',
              value: 'This is a simple blockquote without attribution.',
            },
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      attribution: 'Albert Einstein',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'span',
              value:
                'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.',
            },
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      attribution: 'Maya Angelou',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'span',
              value:
                'There is no greater agony than bearing an untold story inside you.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'span',
              value: 'This blockquote contains multiple paragraphs.',
            },
          ],
        },
      ],
    },

    // ========== THEMATIC BREAKS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Thematic Breaks' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value: 'Thematic breaks create visual separation between sections:',
        },
      ],
    },
    { type: 'thematicBreak' },
    {
      type: 'paragraph',
      children: [{ type: 'span', value: 'Content after the thematic break.' }],
    },
    { type: 'thematicBreak' },

    // ========== LINE BREAKS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Line Breaks' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'This is line one.' },
        { type: 'lineBreak' },
        { type: 'span', value: 'This is line two after a line break.' },
        { type: 'lineBreak' },
        { type: 'span', value: 'This is line three.' },
      ],
    },

    // ========== COMPLEX COMBINATIONS ==========
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'Complex Combinations' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'This paragraph combines ' },
        { type: 'span', marks: ['strong'], value: 'bold' },
        { type: 'span', value: ', ' },
        { type: 'span', marks: ['emphasis'], value: 'italic' },
        { type: 'span', value: ', ' },
        { type: 'span', marks: ['code'], value: 'code' },
        { type: 'span', value: ', and a ' },
        {
          type: 'link',
          url: 'https://www.example.com',
          children: [
            {
              type: 'span',
              marks: ['strong', 'underline'],
              value: 'formatted link',
            },
          ],
        },
        { type: 'span', value: ' all in one paragraph.' },
      ],
    },
    {
      type: 'list',
      style: 'numbered',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'span', value: 'List item with ' },
                { type: 'span', marks: ['strong'], value: 'bold' },
                { type: 'span', value: ', ' },
                { type: 'span', marks: ['emphasis'], value: 'italic' },
                { type: 'span', value: ', and a ' },
                {
                  type: 'link',
                  url: 'https://www.datocms.com',
                  children: [{ type: 'span', value: 'link' }],
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'span', value: 'Another item with ' },
                { type: 'span', marks: ['code'], value: 'inline.code()' },
                { type: 'span', value: ' and ' },
                {
                  type: 'span',
                  marks: ['highlight'],
                  value: 'highlighted text',
                },
              ],
            },
          ],
        },
      ],
    },

    // ========== FINAL NOTE ==========
    { type: 'thematicBreak' },
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'span', value: 'End of Demo' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'span',
          value:
            'This example covers all node types and formatting options available in the DAST specification. You can customize the appearance of any element using the ',
        },
        { type: 'span', marks: ['code'], value: 'customStyles' },
        { type: 'span', value: ' prop.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'span', value: 'For more information, visit ' },
        {
          type: 'link',
          url: 'https://www.datocms.com/docs/structured-text/dast',
          children: [
            { type: 'span', value: 'DatoCMS Structured Text Documentation' },
          ],
        },
        { type: 'span', value: '.' },
      ],
    },
  ],
};

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <StructuredText
          data={exampleData}
          onLinkPress={(url) => {
            Alert.alert('Link Pressed', url);
          }}
          customStyles={{
            heading1Text: {
              fontSize: 28,
              fontWeight: 'bold',
              color: '#2c3e50',
            },
            heading2Text: {
              fontSize: 22,
              fontWeight: 'bold',
              color: '#34495e',
            },
            paragraphText: {
              fontSize: 16,
              lineHeight: 24,
              color: '#2c3e50',
            },
            link: {
              color: '#3498db',
            },
            strong: {
              fontWeight: '700',
              color: '#e74c3c',
            },
            emphasis: {
              fontStyle: 'italic',
              color: '#16a085',
            },
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
});
