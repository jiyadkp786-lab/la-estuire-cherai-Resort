const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4321;
const WORKSPACE_DIR = path.join(__dirname, '../../../../OneDrive/la estuire cherai');
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

              // Generate 192x192
              const canvas192 = document.createElement('canvas');
              canvas192.width = 192;
              canvas192.height = 192;
              canvas192.getContext('2d').drawImage(canvas512, 0, 0, 192, 192);
              const data192 = canvas192.toDataURL('image/png');

              // Generate 32x32
              const canvas32 = document.createElement('canvas');
              canvas32.width = 32;
              canvas32.height = 32;
              canvas32.getContext('2d').drawImage(canvas512, 0, 0, 32, 32);
              const data32 = canvas32.toDataURL('image/png');

              // Generate 48x48 (for fallback .ico)
              const canvas48 = document.createElement('canvas');
              canvas48.width = 48;
              canvas48.height = 48;
              canvas48.getContext('2d').drawImage(canvas512, 0, 0, 48, 48);
              const data48 = canvas48.toDataURL('image/png');

              document.getElementById('status').innerText = 'Sending to server...';
              fetch('/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data192, data32, data48 })
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

        saveBase64(payload.data192, 'favicon.png');
        saveBase64(payload.data32, 'favicon-32x32.png');
        saveBase64(payload.data48, 'favicon.ico');

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Files saved successfully');

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
