const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { jsPDF } = require('jspdf');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trackZalora.html'));
});

app.get('/config', (req, res) => {
  res.json({
    apiEndpoint: process.env.TRACKING_API_ENDPOINT,
    apiKey: process.env.API_KEY
  });
});

app.post('/download-pdf', (req, res) => {
  const doc = new jsPDF();
  doc.fromHTML(req.body.content, 15, 15, {
    'width': 170
  });
  const pdf = doc.output();
  res.type('application/pdf');
  res.send(Buffer.from(pdf, 'binary'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
