const express = require('express');
const app = require('./app');
const path = require('path');
const PORT = process.env.PORT || 5000;

// ✅ Serve PDFs from the pdfs folder
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
