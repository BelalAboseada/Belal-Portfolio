importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  const { routing, strategies, precaching, expiration } = workbox;

  // 1. Skip waiting on install so updates can be forced if needed later
  // However, we DON'T call skipWaiting() immediately on install to avoid breaking GSAP
  // self.skipWaiting(); 
  
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  // 2. Precache static assets (Next.js handles versions so we can safely cache these)
  precaching.precacheAndRoute([
    { url: '/offline.html', revision: '1' },
    // Google fonts in public folder
    { url: '/fonts/CabinetGrotesk-Variable.ttf', revision: '1' },
    { url: '/fonts/Switzer-Variable.ttf', revision: '1' },
  ]);

  // 3. Cache Next.js JS chunks and CSS
  // Using CacheFirst since Next.js chunks are hashed in the filename
  routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/_next/static/'),
    new strategies.CacheFirst({
      cacheName: 'next-static-assets',
      plugins: [
        new expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // 4. Cache Images (SWR)
  routing.registerRoute(
    ({ request, url }) => request.destination === 'image' || url.pathname.startsWith('/images/') || url.pathname.startsWith('/_next/image'),
    new strategies.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // 5. Cache HTML Pages (NetworkFirst)
  const networkFirst = new strategies.NetworkFirst({
    cacheName: 'pages',
    networkTimeoutSeconds: 3, // Fallback to cache after 3 seconds
    plugins: [
      new expiration.ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  });

  routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    async (handler) => {
      try {
        return await networkFirst.handle(handler);
      } catch (error) {
        const cache = await caches.open(workbox.core.cacheNames.precache);
        return cache.match('/offline.html');
      }
    }
  );

} else {
  console.log('Workbox failed to load');
}
