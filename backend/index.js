const http = require('http');
const { WebSocketServer } = require('ws');
const createApp = require('./server');

const server = http.createServer();
const wss = new WebSocketServer({ server });

const app = createApp(wss);
server.on('request', app);

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { wss };
