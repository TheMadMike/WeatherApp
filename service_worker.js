self.addEventListener('install', (event) => {
    console.log('Service worker has been installed.');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker has been activated.');
}); 

self.addEventListener('fetch', (event) => {
    
});
