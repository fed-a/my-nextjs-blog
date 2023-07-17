'use client';

import { useEffect, useRef } from 'react';

import { getStrapiMedia, getStrapiMediaFormats } from '@/lib/api';
import { cn } from '@/lib/utils';

import './image.css';
import { generateImageAttributes } from './lib';
import { ImageFormats } from './types';

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  formats?: Partial<ImageFormats>;
  caption?: string;
  // TODO
  className?: string;
}

// eslint-disable-next-line no-unused-vars
export function FormattedImage(props: BlurImageProps) {
  const { src, alt, width, height, formats, caption } = props;

  const strapiSrc = getStrapiMedia(src);
  const strapiFormats = getStrapiMediaFormats(formats ?? null);
  const sources = generateImageAttributes(strapiFormats ?? null);
  const blurSource = getStrapiMedia(formats?.blur?.url ?? null);

  const pictureContainerRef = useRef<HTMLDivElement>(null);

  function show() {
    if (pictureContainerRef.current?.classList.contains('blur-xl')) {
      pictureContainerRef.current.classList.remove('blur-xl');
    }
    if (pictureContainerRef.current?.children[0].classList.contains('opacity-0')) {
      pictureContainerRef.current?.children[0].classList.remove('opacity-0');
    }
  }

  useEffect(() => {
    const img = pictureContainerRef.current?.querySelector('img');
    if (img) {
      if (img.complete) {
        show();
      } else {
        img.addEventListener('load', show);
      }
    }
  });

  const picture = strapiSrc ? (
    <div
      className={cn(
        'm-auto max-w-full overflow-hidden rounded-lg sm:max-w-xs md:max-w-xl lg:max-w-2xl xl:max-w-3xl',
        {
          'shadow-md': width + height >= 500,
          'rounded-lg': width + height >= 500,
        },
        {
          'shadow-sm': width + height < 500,
          'rounded-md': width + height < 500,
        },
      )}
    >
      <div
        suppressHydrationWarning
        ref={pictureContainerRef}
        className="af-img__picture-container w-full bg-cover bg-center bg-no-repeat blur-xl"
        style={{
          aspectRatio: `${width / height}`,
          backgroundImage: `url(${blurSource})`,
        }}
      >
        <picture suppressHydrationWarning className="opacity-0">
          {sources.map((source) => (
            <source
              key={source.srcSet}
              srcSet={source.srcSet}
              type={source.type}
              media={source.media}
            />
          ))}
          <img src={strapiSrc} alt={alt} />
        </picture>
      </div>
    </div>
  ) : null;

  return (
    <div className="af-img">
      {caption ? (
        <figure>
          {picture}
          <figcaption>{caption}</figcaption>
        </figure>
      ) : (
        picture
      )}
    </div>
  );
}
