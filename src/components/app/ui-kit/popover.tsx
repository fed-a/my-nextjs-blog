'use client';

import React, { useRef, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export function UiKitPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  const onHoverIn = () => {
    setIsOpen(true);
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  };
  const onHoverOut = () => {
    setIsOpen(false);
    blurTimeout.current = setTimeout(() => {
      triggerRef.current?.blur();
    }, 200);
  };
  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} asChild>
        <Button variant="outline" ref={triggerRef}>
          <div className="flex gap-4">
            <div className="h-6 w-12 bg-[url(/assets/images/reactions-min.svg)] bg-center bg-no-repeat focus:bg-blue-500" />
            <span>16</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} sideOffset={0}>
        <div className="flex justify-between space-x-4">
          <div className="h-4 w-4 bg-[url(/assets/images/emoji-like-min.svg)] bg-center bg-no-repeat" />
          <div className="h-4 w-4 bg-[url(/assets/images/emoji-fire-min.svg)] bg-center bg-no-repeat" />
          <div className="h-4 w-4 bg-[url(/assets/images/emoji-hearts-min.svg)] bg-center bg-no-repeat" />
          <div className="h-4 w-4 bg-[url(/assets/images/emoji-tears-min.svg)] bg-center bg-no-repeat" />
          <div className="h-4 w-4 bg-[url(/assets/images/emoji-angry-min.svg)] bg-center bg-no-repeat" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
