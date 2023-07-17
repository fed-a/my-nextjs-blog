import { ImageFormats } from '@/types';

export function getStrapiMedia(url: string | null) {
  if (!url) {
    return null;
  }
  const imageUrl = url.startsWith('/') ? `${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}${url}` : url;
  return imageUrl;
}
export function getStrapiMediaFormats(formats: Partial<ImageFormats> | null) {
  if (!formats) {
    return null;
  }
  return Object.entries(formats).reduce((acc, entry) => {
    const [key, value] = entry as [keyof ImageFormats, ImageFormats[keyof ImageFormats]];
    const newUrl = getStrapiMedia(value.url);
    if (!newUrl) {
      return acc;
    }
    acc[key] = {
      ...value,
      url: newUrl,
    };
    return acc;
  }, {} as Partial<ImageFormats>) as ImageFormats;
}
