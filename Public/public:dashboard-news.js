// Utility: fetch RSS feed, parse XML, return array of items
alert("dashboard-news.js loaded!");
async function fetchRSS(feedUrl) {
    try {
        const corsUrl = 'https://corsproxy.io/?' + encodeURIComponent(feedUrl);
        const res = await fetch(corsUrl);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');
        return Array.from(doc.querySelectorAll('item'));
    } catch (e) {
        return [];
    }
}

// Util: Format date from RSS pubDate
function formatDate(datestr) {
    const date = new Date(datestr);
    if (isNaN(date)) return datestr;
    return date.toLocaleString(undefined, {year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
}

// Render news list for a section
function renderNews(items, selector) {
    const ul = document.querySelector(selector);
    if (!ul) return;
    ul.innerHTML = '';
    items.slice(0,3).forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '#';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const desc = item.querySelector('description')?.textContent?.replace(/<[^>]+>/g, '') || '';
        ul.innerHTML += `
        <li class="update-item">
            <div class="update-title"><a href="${link}" target="_blank" rel="noopener">${title}</a></div>
            <div class="update-meta">${formatDate(pubDate)}</div>
            <div class="update-excerpt">${desc.length > 140 ? desc.slice(0,140) + '…' : desc}</div>
        </li>
        `;
    });
}

// Feed sources (RSS URLs for demo)
const feeds = [
    {
        selector: '[data-feed="xauusd"]',
        url: 'https://za.investing.com/rss/news_301.rss' // Example: Gold
    },
    {
        selector: '[data-feed="bitcoin"]',
        url: 'https://za.investing.com/rss/news_1057394.rss' // Example: Bitcoin
    },
    {
        selector: '[data-feed="usdindex"]',
        url: 'https://za.investing.com/rss/news_2186.rss' // Example: US Dollar Index
    },
    // Add more {selector, url} objects as you find RSS feeds for other sections
];

// Fetch and render feeds
feeds.forEach(async ({selector, url}) => {
    const items = await fetchRSS(url);
    renderNews(items, selector);
});

// Optional: Refresh every hour (3600*1000 ms)
setInterval(() => {
    feeds.forEach(async ({selector, url}) => {
        const items = await fetchRSS(url);
        renderNews(items, selector);
    });
}, 3600 * 1000);