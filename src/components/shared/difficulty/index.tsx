import React from 'react';

import { Difficulties } from '@/types';

import { Typography } from '@/components/ui';

import { cn } from '@/lib/utils';

import './difficulty.css';

export interface DifficultyLocalization {
  difficulty: string;
  difficulties: Difficulties;
}

interface DifficultProps {
  localization: DifficultyLocalization;
  difficultyLevel: keyof Difficulties;
}

export function Difficulty({ localization, difficultyLevel }: DifficultProps) {
  const { difficulty, difficulties } = localization;

  return (
    <div className="flex gap-2">
      <Typography>{difficulty}:</Typography>
      <Typography
        className={cn({
          difficulty_apprentice: difficultyLevel === 'apprentice',
          difficulty_adept: difficultyLevel === 'adept',
          difficulty_master: difficultyLevel === 'master',
          difficulty_expert: difficultyLevel === 'expert',
        })}
      >
        {difficulties[difficultyLevel]}
      </Typography>
    </div>
  );
}
