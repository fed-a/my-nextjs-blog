import { useEffect, useState } from 'react';

export function useSSR() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return {
    isServer: !isMounted,
    isClient: isMounted,
  };
}
