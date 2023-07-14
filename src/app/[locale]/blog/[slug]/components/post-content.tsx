import React from 'react';

import { PostType } from '../types';

import { MarkdownBlocks } from './markdown-blocks';

interface PostContentProps {
  data: PostType | null;
}
export function PostContent(props: PostContentProps) {
  const { data } = props;
  const { title, description, content, timeToRead } = data ?? {};

  if (!data) {
    return null;
  }
  return (
    <article className="">
      <h2>{title}</h2>
      <p>{timeToRead} минута на прочтение</p>
      <p>{description}</p>
      <MarkdownBlocks content={content ?? null} />
    </article>
  );
}
