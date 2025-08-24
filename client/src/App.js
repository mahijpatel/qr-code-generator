import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: inputText.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setQrCode(data.qrCode);
      } else {
        setError(data.error || 'Failed to generate QR code');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (error) setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const clearAll = () => {
    setQrCode('');
    setInputText('');
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>QR Code Generator</h1>
        <p>Enter text or URL to generate a QR code</p>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="input-text">Text or URL:</label>
            <input
              id="input-text"
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter text or URL..."
              className="text-input"
              autoComplete="off"
              autoFocus
              inputMode="text"
              enterKeyHint="go"
              spellCheck="false"
            />
          </div>
          
          <button
            onClick={generateQRCode}
            disabled={loading}
            className="generate-btn"
            type="button"
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {qrCode && (
          <div className="qr-section">
            <h3>Generated QR Code</h3>
            <img src={qrCode} alt="QR Code" className="qr-image" />
            <div className="qr-info">
              <p><strong>Content:</strong> {inputText}</p>
            </div>
            <div className="button-group">
              <button
                onClick={downloadQRCode}
                className="download-btn"
                type="button"
              >
                Download PNG
              </button>
              <button
                onClick={clearAll}
                className="clear-btn"
                type="button"
              >
                Generate New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
