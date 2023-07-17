export const IMAGE_FORMATS = [
  'lg',
  'md',
  'sm',
  'xs',
  'blur',
  'lg_w',
  'md_w',
  'sm_w',
  'xs_w',
  'thumbnail',
] as const;

export interface ImageFormatSource {
  srcSet: string;
  media: string;
  type: string;
  width: number;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export type ImageFormats = Record<(typeof IMAGE_FORMATS)[number], ImageFormat>;
