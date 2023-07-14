'use client';

import anime from 'animejs';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import { useUserIp } from '@/lib/hooks';

import { Reaction, ReactionVariants } from './reaction';

interface ReactionsProps {
  likes: number;
  fires: number;
  hearts: number;
  tears: number;
  angries: number;
}

export function Reactions({ likes, fires, hearts, tears, angries }: ReactionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reactionsContainerRef = useRef<HTMLDivElement>(null);
  const ip = useUserIp();

  const onHoverIn = () => {
    setIsOpen(true);
  };

  const onHoverOut = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        anime({
          targets: reactionsContainerRef.current?.children,
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 900,
          delay: anime.stagger(80),
        });
      });
    }
  }, [isOpen]);

  function getOnReactionClick(reaction: ReactionVariants) {
    return () => {
      setIsOpen(false);
      console.log('clicked', reaction, 'from', ip);
    };
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} asChild>
        <Button variant="outline" ref={triggerRef} aria-haspopup>
          <div className="flex gap-4">
            <div className="h-6 w-12 bg-[url(/assets/images/reactions-min.svg)] icon focus:bg-blue-500" />
            <span>{likes + fires + hearts + tears + angries}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        sideOffset={0}
        className="p-2"
      >
        <div className="flex space-x-1" aria-label="reactions" ref={reactionsContainerRef}>
          <Reaction count={likes} variant="like" onClick={getOnReactionClick('like')} />
          <Reaction count={fires} variant="fire" onClick={getOnReactionClick('fire')} />
          <Reaction count={hearts} variant="hearts" onClick={getOnReactionClick('hearts')} />
          <Reaction count={tears} variant="tears" onClick={getOnReactionClick('tears')} />
          <Reaction count={angries} variant="angry" onClick={getOnReactionClick('angry')} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
