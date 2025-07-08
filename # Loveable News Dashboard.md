# Loveable News Dashboard

A responsive dashboard template for displaying live financial and commodities news feeds, organized for easy import into [Loveable](https://github.com/LoveableHQ/loveable).

## Features

- **Responsive grid**: Adapts to desktop and mobile
- **Modular sections**: Gold, Bitcoin, US Dollar, MetalsMine, S&P Global, Economic Times, Bank of England
- **Easy data binding**: Use `data-feed` attributes for Loveable backend integration
- **Clean, modern style**

## Getting Started

1. **Clone this repo using GitHub Desktop or your preferred method**  
   `git clone https://github.com/YOUR_USERNAME/loveable-news-dashboard.git`

2. **Open the project in your Loveable setup**  
   - Place the contents of the `public/` folder into your Loveable project's `public` or static assets directory.

3. **Integrate with Loveable**  
   - Use the `data-feed` attribute on each `<ul>` to dynamically inject news headlines and excerpts using Loveable's data connectors or backend logic.
   - Example item markup for each feed:
     ```html
     <li class="update-item">
         <div class="update-title"><a href="NEWS_LINK" target="_blank">Headline Title</a></div>
         <div class="update-meta">2025-07-08 11:42 | Source Name</div>
         <div class="update-excerpt">Short excerpt of the news story...</div>
     </li>
     ```
   - Script or backend logic should update each section hourly with the latest three stories.

4. **Customize**  
   - Adjust section headers or add more feeds as needed.  
   - Style further by editing `dashboard-headlines.css`.

## License

MIT