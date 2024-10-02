if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker terdaftar dengan sukses:', registration);
      })
      .catch((error) => {
        console.log('Pendaftaran ServiceWorker gagal:', error);
      });
  });
}
