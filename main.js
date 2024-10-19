const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');   


(async () => {
    const browser = await puppeteer.launch();   

    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/Silver-Napkin-Holder-Table-Dispenser/dp/B0DJSB7XL6/ref=sr_1_5?_encoding=UTF8&content-id=amzn1.sym.82545daf-9a90-4f78-b3cc-f9f3e191c9ad&dib=eyJ2IjoiMSJ9.6aglJM0A0kC105cNYNP5BDlJOfU7QS74XseJjTKbYFWFW7nPuZUn7DGXLmDysWXYvAr-wGgVzf11g0z_bh1yLPMTfnuUJiGpaAXQmSxPLjGIHs2Ls_LJAdj3S-gQjaHImgdUstc6Mry_UN7hIuLwl--0GF_Rhpu7N3y-n9hcJO5z_LzvjO0s5LNwSOEUC3ZInZbbP1tcCQ1tw-D8xbJ4OBrf-vXZmdhLnA0mm5qoqwBr4rJMsTrk6m3qH22GGeYurdwbX-8uq0fvP9HGjlOpI33v9-LS7B2Pyr8uLMBGd0c.ScZpNNZ7gPgIopgxknUeJr6xILHGcatPO2qTZfw6IC4&dib_tag=se&keywords=kitchen%2Band%2Bdining&pd_rd_r=f6bddec7-c1b6-4e4b-8a0d-6407530ef0aa&pd_rd_w=18eDd&pd_rd_wg=GDBI4&pf_rd_p=82545daf-9a90-4f78-b3cc-f9f3e191c9ad&pf_rd_r=8ZJGF5PAYQ2VB8GF4ETA&qid=1729349285&refinements=p_36%3A-5000&sr=8-5&th=1');

    // Esperar a que el contenido se cargue completamente
    await page.waitForSelector('span#productTitle');
    
    // Tomar una captura del contenido HTML
    const html = await page.content();

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(html);

    // Extraer los datos
    const datos = $('span#productTitle').text();
    console.log(datos);

    await browser.close();
})();