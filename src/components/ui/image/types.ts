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

export interface ImageFormats {
  lg: ImageFormat;
  md: ImageFormat;
  sm: ImageFormat;
  xs: ImageFormat;
  blur: ImageFormat;
  lg_w: ImageFormat;
  md_w: ImageFormat;
  sm_w: ImageFormat;
  xs_w: ImageFormat;
  thumbnail: ImageFormat;
}
