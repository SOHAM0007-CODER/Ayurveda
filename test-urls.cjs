const http = require('http');

const urls = [
  '/hero-seq/desktop/001.webp',
  '/hero-seq/mobile/001.webp',
  '/images/hero-still.webp',
  '/intro/poster.webp',
  '/intro/intro.webm',
  '/intro/intro.mp4',
  '/intro/intro-mobile.mp4', // in case it's used
  '/videos/khalva-loop.mp4',
  '/videos/herbs-alive.mp4',
  '/tree/branches-back.webp',
  '/tree/trunk.webp',
  '/tree/branches-front.webp',
  '/tree/blossoms.webp',
  '/textures/petal-pink.webp',
  '/textures/petal-cream.webp',
  '/textures/petal-saffron.webp',
  '/brand/swasthyam-logo.png'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:5173' + path, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, status: err.message });
    });
  });
}

async function main() {
  console.log('Path in code -> Status');
  console.log('-------------------------');
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`${res.path.padEnd(30)} -> ${res.status}`);
  }
}

main();
