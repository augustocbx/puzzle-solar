const CACHE_NAME = 'puzzle-solar-v24';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/planetas.js',
  '/manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ouvir mensagem para pular espera
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Pulando espera e ativando nova versão...');
    self.skipWaiting();
  }
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Limpando cache antigo');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se disponível, senão busca da rede
        return response || fetch(event.request);
      })
      .catch(() => {
        // Se offline e não está no cache, pode retornar uma página de fallback
        console.log('Service Worker: Offline, sem cache disponível');
      })
  );
});
