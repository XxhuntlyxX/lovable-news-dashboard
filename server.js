// server.js - Ready-to-deploy Express backend for your news dashboard

const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const parser = new Parser();

// List your news sources here
const feeds = {
  xauusd: 'https://www.metalsmine.com/news/xauusd?do=rss',
  bitcoin: 'https://news.bitcoin.com/feed/',
  usdindex: 'https://www.dailyfx.com/feeds/market-news',
  metalsmine: 'https://www.metalsmine.com/news/?do=rss',
  spglobal: 'https://www.spglobal.com/commodityinsights/en/rss-feeds/market-insights',
  federalbank: 'https://economictimes.indiatimes.com/wealth/bank/federal-bank/rssfeeds/39489336.cms',
  boe: 'https://www.bankofengland.co.uk/boeapps/rssfeed.aspx?section=News',
  a1trading: 'https://www.a1trading.com/author/tradernick135/feed/',
  traxnyc: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC4P8ylz0_93VaFDtO8CXRNQ'
};

app.use(cors());
app.use(express.static('public')); // Serves index.html, CSS, JS from /public

// API endpoint for fetching RSS feeds
app.get('/feed/:name', async (req, res) => {
  const feedName = req.params.name;
  const feedUrl = feeds[feedName];
  if (!feedUrl) {
    return res.status(404).json({ error: 'Feed not found' });
  }
  try {
    const feed = await parser.parseURL(feedUrl);
    // For TraxNYC, filter to only gold news
    if (feedName === 'traxnyc') {
      feed.items = (feed.items || []).filter(item =>
        (item.title && item.title.toLowerCase().includes('gold')) ||
        (item.content && item.content.toLowerCase().includes('gold')) ||
        (item.contentSnippet && item.contentSnippet.toLowerCase().includes('gold'))
      ).slice(0, 10);
    } else {
      feed.items = (feed.items || []).slice(0, 10);
    }
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feed', details: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});