import { LocaleParams } from '@/types/params';

import { Footer, Navigation } from '@/components/shared';

import { i18n } from '@/lib/i18n';
import { Providers } from '@/lib/providers';

import './globals.css';
import './icons.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale } = params;

  // favicon shows up as static prop...
  // @ts-ignore
  if (locale === 'favicon.ico') {
    return (
      <>
        <body></body>
      </>
    );
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-[100lvh] flex-col overflow-x-hidden">
            <Navigation locale={locale} />
            <div className="af-wrapper">{children}</div>
            <Footer locale={locale} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
