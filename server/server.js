const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Generate QR code endpoint
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Create the content that will be encoded in the QR code
    let qrContent = text;
    
    // Create a simple HTML page for better display when scanned
    qrContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Content</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 40px 20px; 
            background: #f5f5f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            background: white; 
            padding: 40px; 
            border-radius: 10px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        .content { 
            font-size: 24px; 
            color: #333; 
            line-height: 1.6;
            word-break: break-word;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">${text}</div>
    </div>
</body>
</html>`;

    // Generate QR code as data URL
    const qrDataURL = await QRCode.toDataURL(qrContent, {
      width: 300,
      margin: 2
    });

    res.json({
      success: true,
      qrCode: qrDataURL,
      originalText: text
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
