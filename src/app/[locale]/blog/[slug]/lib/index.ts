import { ContentBlock, ContentBlockImage, ContentBlockText } from '../types';

export function isTextBlock(block: ContentBlock): block is ContentBlockText {
  return Boolean(block && block.__typename === 'ComponentDynamicContentText');
}

export function isImageBlock(block: ContentBlock): block is ContentBlockImage {
  return Boolean(block && block.__typename === 'ComponentDynamicContentImage');
}
