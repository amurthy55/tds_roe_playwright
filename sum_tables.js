// sum_tables.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  // Loop through seed=29 to 38
  for (let seed = 29; seed <= 38; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait a bit for tables to render dynamically
    await page.waitForTimeout(1000);

    // Extract numbers from all tables
    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(td => parseFloat(td.textContent.trim()))
        .filter(num => !isNaN(num))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for seed ${seed}: ${sum}`);
    totalSum += sum;
  }

  console.log(`\n✅ Total sum across all seeds: ${totalSum}`);
  await browser.close();
})();
