const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4321;
const WORKSPACE_DIR = __dirname;
const LOGO_PATH = path.join(WORKSPACE_DIR, 'src/assets/logo.jpeg');
const PUBLIC_DIR = path.join(WORKSPACE_DIR, 'public');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Favicon Cropper</title>
      </head>
      <body>
        <h3>Processing Favicon...</h3>
        <div id="status">Loading image...</div>
        <script>
          const img = new Image();
          img.src = '/logo.jpeg';
          img.onload = () => {
            document.getElementById('status').innerText = 'Cropping and resizing...';
            try {
              const srcWidth = img.naturalWidth;
              const srcHeight = img.naturalHeight;
              
              // We want to crop a square centered horizontally, in the upper portion.
              // For 1080x1080: x=284, y=100, w=512, h=512
              const scale = srcWidth / 1080;
              const cropX = Math.round(284 * scale);
              const cropY = Math.round(100 * scale);
              const cropSize = Math.round(512 * scale);

              // Create temporary 512x512 canvas for high quality scaling
              const canvas512 = document.createElement('canvas');
              canvas512.width = 512;
              canvas512.height = 512;
              const ctx512 = canvas512.getContext('2d');
              ctx512.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 512, 512);

              const generateDataUrl = (size) => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                canvas.getContext('2d').drawImage(canvas512, 0, 0, size, size);
                return canvas.toDataURL('image/png');
              };

              const data16 = generateDataUrl(16);
              const data32 = generateDataUrl(32);
              const data48 = generateDataUrl(48);
              const data180 = generateDataUrl(180);
              const data192 = generateDataUrl(192);
              const data512 = generateDataUrl(512);

              document.getElementById('status').innerText = 'Sending to server...';
              fetch('/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data16, data32, data48, data180, data192, data512 })
              })
              .then(r => r.text())
              .then(txt => {
                document.getElementById('status').innerText = 'Done: ' + txt;
              })
              .catch(err => {
                document.getElementById('status').innerText = 'Error uploading: ' + err.toString();
              });
            } catch(e) {
              document.getElementById('status').innerText = 'Error: ' + e.toString();
            }
          };
          img.onerror = () => {
            document.getElementById('status').innerText = 'Error loading logo image';
          };
        </script>
      </body>
      </html>
    `);
  } else if (req.method === 'GET' && req.url === '/logo.jpeg') {
    fs.readFile(LOGO_PATH, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Logo not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/upload') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        
        // Helper function to save base64 image
        const saveBase64 = (dataUrl, filename) => {
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          const destPath = path.join(PUBLIC_DIR, filename);
          fs.writeFileSync(destPath, base64Data, 'base64');
          console.log('Saved:', destPath);
        };

        saveBase64(payload.data16, 'favicon-16x16.png');
        saveBase64(payload.data32, 'favicon-32x32.png');
        saveBase64(payload.data48, 'favicon-48x48.png');
        saveBase64(payload.data48, 'favicon.ico');
        saveBase64(payload.data180, 'apple-touch-icon.png');
        saveBase64(payload.data192, 'favicon.png');
        saveBase64(payload.data512, 'android-chrome-512x512.png');

        // Also save favicon.ico to workspace root just in case
        const base64Ico = payload.data48.replace(/^data:image\/png;base64,/, '');
        const rootIcoPath = path.join(WORKSPACE_DIR, 'favicon.ico');
        fs.writeFileSync(rootIcoPath, base64Ico, 'base64');
        console.log('Saved:', rootIcoPath);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('All favicon files saved successfully');

        // Gracefully shut down server after short delay
        setTimeout(() => {
          console.log('Shutting down server...');
          process.exit(0);
        }, 1000);
      } catch (e) {
        res.writeHead(500);
        res.end('Error: ' + e.toString());
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

