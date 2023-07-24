'use client';

import anime from 'animejs';
import React, { useEffect, useRef, useState } from 'react';

interface AnimeteInProps {
  children: React.ReactNode;
}

export function AnimateInOnIntersect({ children }: AnimeteInProps) {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(ref.current!);
          }
        },
        {
          rootMargin: '-50px',
        },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (ref.current && isIntersecting) {
      anime({
        targets: ref.current,
        opacity: [0, 1],
        translateY: [100, 0],
      });
    }
  }, [isIntersecting, ref]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
