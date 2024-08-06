const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

// Remove dist folder
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
