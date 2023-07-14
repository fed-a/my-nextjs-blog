import React from 'react';

import { Button, ButtonLink } from '@/components/ui';

export function UiKitButton() {
  return (
    <div className="flex gap-1">
      <Button variant="default">Главная</Button>
      <Button variant="secondary">Вторая кнопка</Button>
      <Button variant="destructive">Опасная кнопка</Button>
      <Button variant="default" disabled>
        Неактивная кнопка
      </Button>
      <Button variant="secondary" disabled>
        Неактивная кнопка
      </Button>
      <ButtonLink href="/" locale={'ru'}>
        Кнопка-ссылка
      </ButtonLink>
      <Button variant="tag" size="tag">
        Кнопка-тэг
      </Button>
    </div>
  );
}
