import { render } from '@testing-library/react-native';
import { StructuredText } from '../index';
import type { DastDocument } from '../types';

describe('StructuredText', () => {
  it('renders a simple paragraph', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'span', value: 'Hello world' }],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('renders text with marks', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'span', value: 'Normal ' },
            { type: 'span', marks: ['strong'], value: 'bold' },
            { type: 'span', value: ' and ' },
            { type: 'span', marks: ['emphasis'], value: 'italic' },
          ],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Normal')).toBeTruthy();
    expect(getByText('bold')).toBeTruthy();
    expect(getByText('italic')).toBeTruthy();
  });

  it('renders headings', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'heading',
          level: 1,
          children: [{ type: 'span', value: 'Heading 1' }],
        },
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'span', value: 'Heading 2' }],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Heading 1')).toBeTruthy();
    expect(getByText('Heading 2')).toBeTruthy();
  });

  it('renders bulleted lists', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'list',
          style: 'bulleted',
          children: [
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'span', value: 'Item 1' }],
                },
              ],
            },
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'span', value: 'Item 2' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const { getByText, getAllByText } = render(<StructuredText data={data} />);
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getAllByText('•').length).toBe(2);
  });

  it('renders numbered lists', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'list',
          style: 'numbered',
          children: [
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'span', value: 'First' }],
                },
              ],
            },
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'span', value: 'Second' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('1.')).toBeTruthy();
    expect(getByText('2.')).toBeTruthy();
  });

  it('renders code blocks', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'code',
          code: 'const hello = "world";',
          language: 'javascript',
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('const hello = "world";')).toBeTruthy();
  });

  it('renders blockquotes', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'blockquote',
          attribution: 'John Doe',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'span', value: 'This is a quote' }],
            },
          ],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('This is a quote')).toBeTruthy();
    expect(getByText('— John Doe')).toBeTruthy();
  });

  it('renders thematic breaks', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'span', value: 'Before' }],
        },
        { type: 'thematicBreak' },
        {
          type: 'paragraph',
          children: [{ type: 'span', value: 'After' }],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Before')).toBeTruthy();
    expect(getByText('After')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'span', value: 'Custom styled' }],
        },
      ],
    };

    const customStyles = {
      paragraphText: { fontSize: 24, color: '#FF0000' },
    };

    const { getByText } = render(
      <StructuredText data={data} customStyles={customStyles} />
    );
    const element = getByText('Custom styled');
    expect(element).toBeTruthy();
  });

  it('handles invalid data gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const invalidData = { type: 'paragraph' } as any;
    render(<StructuredText data={invalidData} />);

    expect(consoleSpy).toHaveBeenCalledWith(
      'StructuredText: Invalid data provided. Expected root node.'
    );
    consoleSpy.mockRestore();
  });

  it('renders nested lists', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'list',
          style: 'bulleted',
          children: [
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'span', value: 'Parent 1' }],
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
                          children: [{ type: 'span', value: 'Child 1' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Parent 1')).toBeTruthy();
    expect(getByText('Child 1')).toBeTruthy();
  });

  it('renders complex mixed content', () => {
    const data: DastDocument = {
      type: 'root',
      children: [
        {
          type: 'heading',
          level: 1,
          children: [{ type: 'span', value: 'Title' }],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'span', value: 'This is ' },
            { type: 'span', marks: ['strong'], value: 'important' },
            { type: 'span', value: ' text.' },
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
                  children: [{ type: 'span', value: 'First item' }],
                },
              ],
            },
          ],
        },
        { type: 'thematicBreak' },
        {
          type: 'code',
          code: 'console.log("test");',
        },
      ],
    };

    const { getByText } = render(<StructuredText data={data} />);
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('important')).toBeTruthy();
    expect(getByText('First item')).toBeTruthy();
    expect(getByText('console.log("test");')).toBeTruthy();
  });
});
