# Simple QR Code Generator

A basic full-stack web application that generates QR codes from text or URLs. Built with React frontend and Node.js backend.

## Features

- Simple input box for text or URL input
- Generate QR code button
- Display generated QR code image
- Basic, clean UI with CSS

## Tech Stack

- **Frontend**: React + CSS
- **Backend**: Node.js + Express
- **QR Generation**: qrcode library

## Project Structure

```
qr-code-generator/
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation & Running

1. **Start the Backend Server:**
   ```bash
   cd server
   npm install
   npm start
   ```
   The server will run on http://localhost:5000

2. **Start the Frontend Client:**
   ```bash
   cd client
   npm install
   npm start
   ```
   The React app will run on http://localhost:3000

3. **Open your browser** and navigate to http://localhost:3000

## API Endpoints

- `POST /api/generate-qr` - Generate QR code from text/URL
- `GET /api/health` - Health check

## Usage

1. Enter any text or URL in the input field
2. Click "Generate QR Code" button
3. View the generated QR code
4. Click "Generate New" to start over

## License

MIT
