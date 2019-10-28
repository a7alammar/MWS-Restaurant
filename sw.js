let staticCacheName = 'mws-static-v1';

// Install Service worker and cache all pages and assets required for offline access

self.addEventListener('install', function (event){
event.waitUntil(caches.open(staticCacheName).then(function(cache){
return cache.addAll(['./',
'js/main.js', 'js/restaurant_info.js', 'js/dbhelper.js', 
'css/styles.css',
'img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg',
'data/restaurants.json',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
      ]);
  }));
});

 // Activate Service worker and delete old cache (if any) add new cache
 
 self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-static-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(    
    caches.match(event.request).then(function(response) {
        if (response !== undefined) {
          return response;
        } 
        else 
        {        
          return fetch(event.request).then(function (response) {
                let responseClone = response.clone();
                caches.open(staticCacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                  }
                )
                return response;
              }
          )
        }
      }
    ) 
      
  )

}
)


  