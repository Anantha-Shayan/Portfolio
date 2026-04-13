'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-J4NWDWC7LC', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
