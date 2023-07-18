import React from 'react';

import { ContentBlock } from '@/types/app/blog/[slug]';

import { FormattedImage, Markdown } from '@/components/ui';

import { isImageBlock, isTextBlock } from '../../../../lib/app/blog/[slug]';

import { MarkdownBlockWrapper } from './markdown-block-wrapper';

interface MarkdownBlockProps {
  block: ContentBlock;
}

export function MarkdownBlock({ block }: MarkdownBlockProps) {
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
}
