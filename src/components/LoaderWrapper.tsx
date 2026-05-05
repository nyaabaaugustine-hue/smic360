'use client';
import PageLoader from './PageLoader';

/**
 * Thin 'use client' shell so PageLoader (which uses hooks)
 * can be imported from the server-side RootLayout.
 */
export default function LoaderWrapper() {
  return <PageLoader />;
}
