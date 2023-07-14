import React from 'react';

import { FormattedImage, Markdown } from '@/components/ui';

import { isImageBlock, isTextBlock } from '../lib';
import { ContentType } from '../types';

interface MarkdownBlocksProps {
  content: ContentType | null;
}

function MarkdownBlockWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function MarkdownBlocks({ content }: MarkdownBlocksProps) {
  return (
    <div className="af-markdown">
      {content?.map((block) => {
        if (isTextBlock(block)) {
          const { id, text } = block;
          return (
            <MarkdownBlockWrapper key={id}>
              <Markdown>{text}</Markdown>
            </MarkdownBlockWrapper>
          );
        }
        if (isImageBlock(block)) {
          const { id, media } = block;
          const { alternativeText, url, formats, width, height } = media.data.attributes;
          return (
            <MarkdownBlockWrapper key={id}>
              <FormattedImage
                alt={alternativeText}
                src={url}
                width={width}
                height={height}
                formats={formats as any}
              />
            </MarkdownBlockWrapper>
          );
        }
        return null;
      })}
    </div>
  );
}
