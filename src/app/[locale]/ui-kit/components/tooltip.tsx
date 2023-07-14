import React from 'react';

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';

export function UiKitTooltip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <div className="flex gap-4">
              <div className="h-6 w-12 bg-[url(/assets/images/reactions-min.svg)] bg-center bg-no-repeat" />
              <span>16</span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
