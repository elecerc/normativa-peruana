/**
 * This is the main Node.js server script for your project.
 */

const path = require("path");

// Import Express and create the app
const express = require('express');
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Import Axios and Cheerio for scraping
const axios = require('axios');
const cheerio = require('cheerio');

// Root route
app.get('/', (req, res) => {
  res.send('Servidor funcionando con Express');
});

// Endpoint to return full HTML from target URL
app.get('/scrape-test', async (req, res) => {
  try {
    const url = 'https://diariooficial.elperuano.pe/Normas';
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
    });
    res.send(data);
  } catch (error) {
    console.error('Error in /scrape-test:', error);
    res.status(500).send('Error fetching HTML');
  }
});

// Endpoint to scrape and extract data
app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://diariooficial.elperuano.pe/Normas';
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    let norms = [];
    $('.norma-item').each((i, elem) => {
      const title = $(elem).find('.norma-title').text().trim();
      const link = $(elem).find('a').attr('href');
      norms.push({ title, link });
    });
    res.json(norms);
  } catch (error) {
    console.error('Error in /scrape:', error);
    res.status(500).send('Error during scraping');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
