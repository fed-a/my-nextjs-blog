import React from 'react';

import { Difficulties } from '@/types';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { TAGS_FIELDS } from '@/lib/i18n/types';

interface MainPageFilterProps {
  tags: Record<string, string>;
  difficulty: string;
  difficulties: Difficulties;
}

export function MainPageFilter({ tags, difficulties, difficulty }: MainPageFilterProps) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-2">
        {TAGS_FIELDS.map((tag) => (
          <Button key={tag} variant={'tag'} size="tag">
            {tags[tag]}
          </Button>
        ))}
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={difficulty} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(difficulties).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
