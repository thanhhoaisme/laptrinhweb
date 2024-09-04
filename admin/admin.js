const path = require('path');

const imagePath = "C:\\Users\\Admin\\Downloads\\1\\picture\\fahasa-logo.webp";
const correctImagePath = path.normalize(imagePath).replace(/\\/g, '/');

console.log(`<img src='${correctImagePath}' alt='Fahasa logo'>`);










