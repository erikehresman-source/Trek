
/* TNG Adventure PWA Service Worker — v2.5.1 (Settings) */
(function(){
  'use strict';
  var VERSION = 'v2.5.2';
  var CACHE_NAME = 'tng-cache-' + VERSION;
  var CORE = [
    './','./index.html','./manifest.webmanifest','./sw.js',
    './icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/maskable-1024.png',
    './assets/backgrounds/bridge-800.png','./assets/backgrounds/bridge-1600.png',
    './assets/backgrounds/away-800.png','./assets/backgrounds/away-1600.png',
    './assets/backgrounds/combat-800.png','./assets/backgrounds/combat-1600.png',
    './assets/portraits/picard-128.png','./assets/portraits/picard-256.png',
    './assets/portraits/riker-128.png','./assets/portraits/riker-256.png',
    './assets/portraits/data-128.png','./assets/portraits/data-256.png',
    './assets/portraits/worf-128.png','./assets/portraits/worf-256.png',
    './assets/portraits/laforge-128.png','./assets/portraits/laforge-256.png',
    './assets/portraits/troi-128.png','./assets/portraits/troi-256.png'
  ];
  self.addEventListener('install', function(event){
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(CORE);
    }).then(function(){ return self.skipWaiting(); }));
  });
  self.addEventListener('activate', function(event){
    event.waitUntil(caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k.indexOf('tng-cache-')===0 && k!==CACHE_NAME){ return caches.delete(k); }
      }));
    }).then(function(){ return self.clients.claim(); }));
  });
  function fromCache(request){
    return caches.match(request).then(function(resp){
      return resp || fetch(request);
    });
  }
  function updateCache(request){
    return fetch(request).then(function(resp){
      var copy = resp.clone();
      caches.open(CACHE_NAME).then(function(cache){ cache.put(request, copy); });
      return resp;
    }).catch(function(){ return caches.match(request); });
  }
  self.addEventListener('fetch', function(event){
    var req = event.request;
    if(req.method !== 'GET'){ return; }
    var url = new URL(req.url);
    if(url.origin === self.location.origin){
      if(req.headers.get('accept') && req.headers.get('accept').indexOf('text/html') !== -1){
        event.respondWith(fetch(req).then(function(resp){
          var copy = resp.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
          return resp;
        }).catch(function(){ return caches.match('./index.html'); }));
        return;
      }
      event.respondWith(fromCache(req));
      event.waitUntil(updateCache(req));
    }
  });
})();
