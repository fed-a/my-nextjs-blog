export const TYPOGRAPHY_TYPES_H = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const TYPOGRAPHY_TYPES_P = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const;
export const TYPOGRAPHY_TYPES_OTHER = ['marquee'] as const;
export const TYPOGRAPHY_STYLES = ['normal', 'bold', 'italic', 'underlined'] as const;

export type TypographyTypeHeadings = (typeof TYPOGRAPHY_TYPES_H)[number];
export type TypographyTypeParagraphs = (typeof TYPOGRAPHY_TYPES_P)[number];
export type TypographyTypeOther = (typeof TYPOGRAPHY_TYPES_OTHER)[number];
export type TypographyType =
  | (typeof TYPOGRAPHY_TYPES_H)[number]
  | (typeof TYPOGRAPHY_TYPES_P)[number]
  | (typeof TYPOGRAPHY_TYPES_OTHER)[number];
export type TypographyStyle = (typeof TYPOGRAPHY_STYLES)[number];

export interface TypographyProps {
  children: string | string[];
  type?: TypographyType;
  styleType?: TypographyStyle[];
  isSpan?: boolean;
  className?: string;
}
