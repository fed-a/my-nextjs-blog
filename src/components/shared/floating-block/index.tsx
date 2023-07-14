'use client';

import anime from 'animejs';
import React, { CSSProperties, useCallback, useRef, useState } from 'react';

import { Portal } from '@/components/ui';

import { cn } from '@/lib/utils';

import './floating-block.css';

interface FloatingBlockProps {
  children: React.ReactNode;
  block: React.ReactNode;
  className?: string;
  position?: 'top-left' | 'center';
}

const BLOCK_HIDDEN: CSSProperties = {
  opacity: 0,
};

const BLOCK_DISPLAY: CSSProperties = {
  opacity: 1,
};

export function FloatingBlock(props: FloatingBlockProps) {
  const { block, children, className, position = 'top-left' } = props;
  const floatingDiv = useRef<HTMLDivElement>(null);
  const [blockStyles, setBlockStyles] = useState(BLOCK_HIDDEN);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    anime({
      targets: floatingDiv.current,
      top: e.clientY,
      left: e.clientX,
      duration: 500,
      easing: 'cubicBezier(0, 1, 0, 1)',
    });
  }, []);

  const handleMouseIn = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setBlockStyles(BLOCK_DISPLAY);
    anime({
      targets: floatingDiv.current,
      top: e.clientY,
      left: e.clientX,
      duration: 200,
      easing: 'easeOutQuad',
    });
  }, []);

  const handleMouseOut = useCallback(() => {
    setBlockStyles(BLOCK_HIDDEN);
  }, []);

  return (
    <>
      <div
        className={cn(
          'inline-block',
          {
            'cursor-none': position === 'center',
          },
          className,
        )}
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      <Portal>
        <div
          className={cn('af-floating-block', {
            'af-floating-block--top-left': position === 'top-left',
            'af-floating-block--center': position === 'center',
          })}
          aria-hidden
          style={blockStyles}
          ref={floatingDiv}
        >
          {block}
        </div>
      </Portal>
    </>
  );
}
