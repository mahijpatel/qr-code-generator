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

    // Generate QR code as data URL
    const qrDataURL = await QRCode.toDataURL(text, {
      width: 300,
      margin: 2
    });

    res.json({
      success: true,
      qrCode: qrDataURL
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
