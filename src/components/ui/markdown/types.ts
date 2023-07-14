import { SpecialComponents } from 'react-markdown/lib/ast-to-react';

export type MarkdownComponents = Partial<Record<keyof SpecialComponents | 'p', any>>;
