const FEED_NAMES = [
  { name: 'xauusd', label: 'Gold (XAU/USD) News' },
  { name: 'bitcoin', label: 'Bitcoin News' },
  { name: 'usdindex', label: 'US Dollar Index News' },
  { name: 'metalsmine', label: 'MetalsMine Hot Stories' },
  { name: 'spglobal', label: 'S&P Global - Latest Commodity Insights' },
  { name: 'federalbank', label: 'Economic Times: Federal Bank News' },
  { name: 'boe', label: 'Bank of England News' },
  { name: 'a1trading', label: 'TraderNick (A1Trading.com)' } // <-- Add this line!
];

// Use your Replit backend URL:
const BACKEND_URL = "https://9e93adcf-5ee0-458d-af2c-c8cfa5c7e917-00-3rdaay9e1y9js.picard.replit.dev";

FEED_NAMES.forEach(feed => {
  const ul = document.querySelector(`[data-feed="${feed.name}"]`);
  if (!ul) return;
  ul.innerHTML = "<li>Loading...</li>";
  fetch(`${BACKEND_URL}/feed/${feed.name}`)
    .then(response => response.json())
    .then(data => {
      ul.innerHTML = "";
      data.items.forEach(item => {
        const li = document.createElement("li");
        li.className = "update-item";
        // Show YouTube icon for TraderNick
        let titleContent = "";
        if (feed.name === "tradernick" && feed.icon) {
          titleContent = `<img class="tradernick-icon" src="${feed.icon}" alt="YouTube" /> `;
        }
        titleContent += `<a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>`;
        li.innerHTML = `
          <div class="update-title">
            ${titleContent}
          </div>
          <div class="update-meta">${item.pubDate || ""}</div>
          <div class="update-excerpt">${item.contentSnippet || ""}</div>
        `;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      ul.innerHTML = `<li class="update-item">Failed to load feed (${feed.label})</li>`;
    });
});