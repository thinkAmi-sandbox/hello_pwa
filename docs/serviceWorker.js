// Cache name
const CACHE_NAME = 'hello-pwa';
// Cache targets
const URLS_TO_CACHE = [
    './',
    './index.html',
];
const CACHE_KEYS = [
    CACHE_NAME
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response ? response : fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    // 新しいバージョンがインストールされた場合に、キャッシュをクリアする
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => {
                    return !CACHE_KEYS.includes(key);
                }).map(key => {
                    // 不要なキャッシュを削除
                    return caches.delete(key);
                })
            );
        })
    );
});