import { TypographyStyle, TypographyType } from './types';

export function resolveTag(type: TypographyType, isSpan: boolean) {
  switch (type) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    default:
      return isSpan ? 'span' : 'p';
  }
}

function resolveFontStyle(style: TypographyStyle) {
  switch (style) {
    case 'normal':
      return null;
    case 'bold':
      return 'font-bold';
    case 'italic':
      return 'italic';
    case 'underlined':
      return 'underline';
    default:
      return '';
  }
}

function resolveFontStyles(styles: TypographyStyle[]) {
  return styles
    .reduce((acc, style) => {
      const resolvedStyle = resolveFontStyle(style);
      return resolvedStyle ? `${acc} ${resolvedStyle}` : acc;
    }, '')
    .trim();
}

export function resolveStyles(type: TypographyType, styles: TypographyStyle[]) {
  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return resolveFontStyles(styles);
    case 'p1':
      return `text-base sm:text-lg md:text-xl lg:text-2xl ${resolveFontStyles(styles)}`;
    case 'p2':
      return `text-base sm:text-lg md:text-xl ${resolveFontStyles(styles)}`;
    case 'p3':
      return `text-sm sm:text-base md:text-lg ${resolveFontStyles(styles)}`;
    case 'p4':
      return `text-xs sm:text-sm md:text-base ${resolveFontStyles(styles)}`;
    case 'p5':
      return `text-xs sm:text-sm ${resolveFontStyles(styles)}`;
    case 'p6':
      return `text-xs ${resolveFontStyles(styles)}`;
    case 'marquee':
      return `font-[Unbounded,_sans] text-[2rem] md:text-[3rem] lg:text-[4rem] ${resolveFontStyles(
        styles,
      )}`;
    default:
      return '';
  }
}
