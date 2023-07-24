import { Github, Instagram, Linkedin } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

import { LandingDocument, LandingQueryResult, LandingQueryVariables } from '@/gql/graphql';
import { Localed } from '@/types';

import { HeroButtons, HeroCode, HeroDown } from '@/components/app/about';
import { AnimateInOnIntersect } from '@/components/shared';
import { Button } from '@/components/ui';

import { fetchAPI } from '@/lib/api';
import { useAppTranslationSSR } from '@/lib/i18n/use-translation-ssr';
import { cn } from '@/lib/utils';

import './page.css';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Localed<{}> }): Promise<Metadata> {
  const { t } = await useAppTranslationSSR(params.locale);
  return {
    title: t('name'),
  };
}

export default async function AboutPage({ params }: { params: Localed<{}> }) {
  const { locale } = params;
  const pageData = await fetchAPI<LandingQueryResult, LandingQueryVariables>(LandingDocument, {
    locale,
  });
  const {
    hero: heroData,
    about: aboutData,
    project: projectData,
    blog: blogData,
  } = pageData.data ?? {};
  const hero = heroData?.data?.attributes;
  const about = aboutData?.data?.attributes;
  const project = projectData?.data?.attributes;
  const blog = blogData?.data?.attributes;

  const IN_DEV = true;

  return (
    <main className={cn({ 'overflow-hidden max-h-[calc(100dvh_-_24rem)]': IN_DEV })}>
      {IN_DEV && (
        <div className="z-50 bg-blue-800/70 absolute left-0 top-0 right-0 bottom-0 grid place-content-center">
          <h1>В разработке</h1>
        </div>
      )}
      <div className="landing__hero-bg" />
      <section className="container flex flex-col justify-between h-[calc(100dvh-8rem)] md:h-[calc(100dvh-12rem)] min-h-[40rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12">
          <div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              {hero?.name}
            </h1>
            <HeroButtons
              localization={{ toContacts: hero?.toContacts ?? '', toWorks: hero?.toWorks ?? '' }}
            />
          </div>
          <HeroCode />
        </div>
        <div className="pb-28 flex justify-between">
          <AnimateInOnIntersect>
            <HeroDown label={hero?.down ?? ''} />
          </AnimateInOnIntersect>
          <AnimateInOnIntersect>
            <div className="flex gap-4">
              <Button size="icon-lg" variant="secondary">
                <Instagram />
              </Button>
              <Button size="icon-lg" variant="secondary">
                <Linkedin />
              </Button>
              <Button size="icon-lg" variant="secondary">
                <Github />
              </Button>
            </div>
          </AnimateInOnIntersect>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-800 min-h-[100dvh]"></section>
      <div className="p-4">{JSON.stringify(hero)}</div>
      <div className="p-4">{JSON.stringify(about)}</div>
      <div className="p-4">{JSON.stringify(project)}</div>
      <div className="p-4">{JSON.stringify(blog)}</div>
    </main>
  );
}
