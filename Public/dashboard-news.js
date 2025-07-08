// Show a test message in every updates-list section for all news outlets
const outlets = [
  'xauusd',        // Gold (XAU/USD) News
  'bitcoin',       // Bitcoin News
  'usdindex',      // US Dollar Index News
  'metalsmine',    // MetalsMine Hot Stories
  'spglobal',      // S&P Global - Latest Commodity Insights
  'federalbank',   // Economic Times: Federal Bank News
  'boe'            // Bank of England News
];

outlets.forEach(feed => {
  const ul = document.querySelector(`[data-feed="${feed}"]`);
  if (ul) {
    ul.innerHTML = `<li class="update-item"><div class="update-title">Hello from JS! (${feed})</div></li>`;
  }
});