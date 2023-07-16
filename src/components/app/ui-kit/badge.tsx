import React from 'react';

import { Badge } from '@/components/ui';

export function UiKitBadge() {
  return (
    <div className="flex gap-3">
      <Badge>React</Badge>
      <Badge>Next.js</Badge>
    </div>
  );
}
