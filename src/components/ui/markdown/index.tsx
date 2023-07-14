'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import { getMarkdownComponents } from './components';
import './markdown.css';
import { MarkdownComponents } from './types';

interface MarkdownProps {
  children: string;
  components?: MarkdownComponents;
}

export function Markdown(props: MarkdownProps) {
  const { children } = props;

  const components = useMemo(() => getMarkdownComponents(), []);

  return (
    <div className="af-markdown_component">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
