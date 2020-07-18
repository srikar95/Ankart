caches.open(cacheName).then( (cache) => { 
  cache.keys().then( (arrayOfRequest) => { 
      console.log(arrayOfRequest);
        localStorage.setItem('Cache data', arrayOfRequest);
  });
});
