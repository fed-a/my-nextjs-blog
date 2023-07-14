import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Button, Typography } from '@/components/ui';

import { cn } from '@/lib/utils';

const reactionVariants = cva('h-6 w-6 bg-[url(/assets/images/emoji-like-min.svg)] icon', {
  variants: {
    variant: {
      like: 'bg-[url(/assets/images/emoji-like-min.svg)]',
      fire: 'bg-[url(/assets/images/emoji-fire-min.svg)]',
      hearts: 'bg-[url(/assets/images/emoji-hearts-min.svg)]',
      tears: 'bg-[url(/assets/images/emoji-tears-min.svg)]',
      angry: 'bg-[url(/assets/images/emoji-angry-min.svg)]',
    },
  },
  defaultVariants: {
    variant: 'like',
  },
});

export type ReactionVariants = NonNullable<VariantProps<typeof reactionVariants>['variant']>;

interface ReactionProps {
  onClick: () => void;
  variant: ReactionVariants;
  count: number;
}

export function Reaction({ variant, onClick, count }: ReactionProps) {
  return (
    <div style={{ opacity: 0 }} className="flex flex-col items-center">
      <Button
        name={variant}
        variant="secondary"
        size="icon"
        onClick={onClick}
        aria-label={`${variant} reaction`}
      >
        <div className={cn(reactionVariants({ variant }))} />
      </Button>
      <label>
        <Typography type="p6" className=" text-primary/80">
          {`${count}`}
        </Typography>
      </label>
    </div>
  );
}
