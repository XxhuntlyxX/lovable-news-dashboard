const FEED_NAMES = [
  { name: 'xauusd', label: 'Gold (XAU/USD) News' },
  { name: 'bitcoin', label: 'Bitcoin News' },
  { name: 'usdindex', label: 'US Dollar Index News' },
  { name: 'metalsmine', label: 'MetalsMine Hot Stories' },
  { name: 'spglobal', label: 'S&P Global - Latest Commodity Insights' },
  { name: 'federalbank', label: 'Economic Times: Federal Bank News' },
  { name: 'boe', label: 'Bank of England News' },
  { name: 'a1trading', label: 'TraderNick (A1Trading.com)' },
  { name: 'traxnyc', label: 'TraxNYC Gold News', url: 'https://www.google.com/search?client=opera-gx&sca_esv=fd62a53945ec0901&sxsrf=AE3TifMPJU0K7DK0hxSGMpem0V6w_8LqXg:1755803139272&udm=7&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zENyQuF3_WaPI4Qgb6AZzy-etFjo9fqZ_m1LmwOk0Tw7Ns_0OocK1BNAsSvkZGRaIDBJ5_VC5GjNWHeLLVc9aY1YFxSVAnbKv87ntDKOTQ-__6ux0fJ1zJWSCXtmTj5zAXKhQz_O8AXaIHbB8YUV2X_-uCtuHA&q=traxnyc+gold&sa=X&ved=2ahUKEwiNvqWzzJyPAxWQa0EAHbc9Aa4QtKgLegQIDBAB&biw=1639&bih=941&dpr=2' }
];

// Use your Replit backend URL:
const BACKEND_URL = "https://9e93adcf-5ee0-458d-af2c-c8cfa5c7e917-00-3rdaay9e1y9js.picard.replit.dev";

FEED_NAMES.forEach(feed => {
  const ul = document.querySelector(`[data-feed="${feed.name}"]`);
  if (!ul) return;
  ul.innerHTML = "<li>Loading...</li>";
  // Special case for TraxNYC: link directly to Google News
  if (feed.name === "traxnyc" && feed.url) {
    ul.innerHTML = `
      <li class="update-item">
        <div class="update-title">
          <a href="${feed.url}" target="_blank" rel="noopener">View TraxNYC Gold News on Google</a>
        </div>
      </li>
    `;
    return;
  }
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