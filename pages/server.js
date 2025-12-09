import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3240;

const publicDir = join(__dirname, 'build/client');

// Serve static assets (JS, CSS, etc.)
app.use('/assets', express.static(join(publicDir, 'assets')));
app.use(express.static(publicDir));

// Supported error codes
const errorCodes = ['401', '403', '404', '405', '500', '502', '503'];

// Serve error pages at their respective endpoints
errorCodes.forEach(code => {
  app.get(`/${code}`, (req, res) => {
    // Serve the SPA entry point (index.html) for all error pages
    // The React app will handle the routing and rendering based on the URL
    const filePath = join(publicDir, 'index.html');
    res.status(parseInt(code)).sendFile(filePath);
  });
});

// Default route serves index.html
app.get('/', (req, res) => {
  const filePath = join(publicDir, 'index.html');
  res.sendFile(filePath);
});

// Catch-all for any other route
app.get('*', (req, res) => {
  const filePath = join(publicDir, 'index.html');
  res.status(404).sendFile(filePath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Error pages server running on http://localhost:${PORT}`);
  console.log(`Available endpoints: ${errorCodes.map(c => `/${c}`).join(', ')}`);
});
