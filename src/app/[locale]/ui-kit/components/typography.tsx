import React from 'react';

import { Typography } from '@/components/ui';

export function UiKitTypography() {
  return (
    <>
      <Typography type="h1">Заголовок 1</Typography>
      <Typography type="h2">Заголовок 2</Typography>
      <Typography type="h3">Заголовок 3</Typography>
      <Typography type="h4">Заголовок 4</Typography>
      <Typography type="h5">Заголовок 5</Typography>
      <Typography type="h6">Заголовок 6</Typography>
      <div>
        <Typography type="p1">Текст 1</Typography>
      </div>
      <div>
        <Typography type="p2">Текст 2</Typography>
      </div>
      <div>
        <Typography type="p3">Текст 3</Typography>
      </div>
      <div>
        <Typography type="p4">Текст 4</Typography>
      </div>
      <div>
        <Typography type="p5">Текст 5</Typography>
      </div>
      <div>
        <Typography type="p6">Текст 6</Typography>
      </div>
      <div>
        <Typography type="p1" styleType={['bold']}>
          Текст жирный
        </Typography>
      </div>
      <div>
        <Typography type="p1" styleType={['italic']}>
          Текст жирный
        </Typography>
      </div>
      <div>
        <Typography type="p1" styleType={['underlined']}>
          Текст жирный
        </Typography>
      </div>
      <div>
        <Typography type="p1" styleType={['bold', 'italic', 'underlined']}>
          Текст жирный
        </Typography>
      </div>
      <div>
        <Typography type="marquee">Особый</Typography>
      </div>
    </>
  );
}
