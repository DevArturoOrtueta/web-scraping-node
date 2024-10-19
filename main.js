const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

async function scrapeData(url, selectors) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(selectors[0]); // Espera al primer selector

    const html = await page.content();
    const $ = cheerio.load(html);

    const results = {};

    for (const selector of selectors) {
        const data = $(selector).text().trim(); // Aplica trim a cada selector
        results[selector] = data; // Agrega al objeto con el selector como clave
    }

    await browser.close();
    return results;
}

app.get('/scrape', async (req, res) => {
    const { url, selectors } = req.query;

    if (!url || !selectors) {
        return res.status(400).json({ error: 'Faltan parámetros: url y/o selectors' });
    }

    // Convertir el string de selectores en un array
    const selectorArray = Array.isArray(selectors) ? selectors : selectors.split(',');
    
    try {
        const data = await scrapeData(url, selectorArray);
        res.json(data); // Retorna el objeto con todos los resultados
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});