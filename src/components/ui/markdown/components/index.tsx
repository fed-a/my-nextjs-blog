import SyntaxHighlighter from 'react-syntax-highlighter';

import { MARKDOWN_CODE } from '../lib';
import { MarkdownComponents } from '../types';

export const getMarkdownComponents = (): MarkdownComponents => {
  return {
    code: ({ inline, className, children, ...props }: any) => {
      const lineCount = String(children).split('\n').filter(Boolean).length;
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="af-markdown__code">
          <div className="code__topbar">
            <span />
            <span />
            <span />
          </div>
          <SyntaxHighlighter
            {...props}
            showLineNumbers={lineCount > 1}
            style={MARKDOWN_CODE}
            language={match[1]}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };
};
