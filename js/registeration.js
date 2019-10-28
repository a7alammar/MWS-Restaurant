
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        }).then( registration => {
           console.log('Service worker registeration successful');
        }).catch(err => {
           console.log('Service worker registration failed');
        })
      }
    })
  }