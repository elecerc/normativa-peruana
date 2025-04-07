/**
 * This is the main Node.js server script for your project.
 */

const path = require("path");
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando con Express');
});

// Rutas de scraping
// ... etc ...

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
