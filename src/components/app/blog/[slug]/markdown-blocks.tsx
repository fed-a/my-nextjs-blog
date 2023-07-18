import React from 'react';

import { ContentBlockImage, ContentBlockText, ContentType } from '@/types/app/blog/[slug]';

import { MarkdownBlock } from './markdown-block';

interface MarkdownBlocksProps {
  content: ContentType | null;
}

export function MarkdownBlocks({ content }: MarkdownBlocksProps) {
  return (
    <div className="flex flex-col gap-8">
      {content?.map((block, index) => (
        <MarkdownBlock
          key={
            (block as ContentBlockText | ContentBlockImage | null)?.id ??
            `${block?.__typename}_${index}`
          }
          block={block}
        />
      ))}
    </div>
  );
}
