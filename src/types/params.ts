import { Locale } from '@/lib/i18n';

export type LocaleParams = {
  locale: Locale;
};

export type Localed<T> = LocaleParams & T;

export interface SkeletonProps {
  show: boolean;
  children: React.ReactNode;
}
