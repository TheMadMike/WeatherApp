if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js')
        .then( (registration) => console.log('Service worker successfully registered.', registration) )
        .catch( (error) => console.log('Unable to register service worker.', error) );

} 

else {
    console.log("This browser doesn't support service workers.");
}