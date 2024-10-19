const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port   
 = 3000;

async function scrapeData(url, selector) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(selector);   


    const html = await page.content();
    const $ = cheerio.load(html);

    const data = $(selector).text();
    await browser.close();
    return data;
}

app.get('/scrape', async (req, res) => {
    const { url, selector } = req.query;
    try {
        const data = (await scrapeData(url, selector));
        res.json({ data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});