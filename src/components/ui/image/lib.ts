import { ImageFormats, ImageFormatSource } from './types';

const IGNORE_FORMATS = ['blur', 'thumbnail'];
const MIME_TYPES = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
]);

function sortSources(sources: ImageFormatSource[]) {
  return sources.sort((a, b) => {
    if (a.type === b.type) {
      return a.width - b.width;
    }
    return a.type === 'image/webp' ? -1 : 1;
  });
}

export function generateImageAttributes(formats: ImageFormats | null) {
  if (!formats) {
    return [];
  }
  const keys = Object.keys(formats);
  const result: ImageFormatSource[] = [];

  keys.forEach((key) => {
    if (IGNORE_FORMATS.includes(key)) {
      return;
    }
    const format = formats[key as keyof ImageFormats];
    const { url, width, ext } = format;
    result.push({
      srcSet: `${url}`,
      media: `(max-width: ${width + 48}px)`,
      type: MIME_TYPES.get(ext) ?? '',
      width,
    });
  });

  return sortSources(result);
}
