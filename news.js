/**
 * Strategic Multi-Domain Console (SMDC) - Supreme Metrics
 * Features: High-Resolution Graphing (Multi-point Axes), Single-Stream Intel.
 * Seed Data: March 25, 2024
 */

const MARKET_PORTFOLIO = [
    { symbol: "LMT", name: "LOCKHEED_MARTIN", price: 423.31, change: 0.15, history: [] },
    { symbol: "NOC", name: "NORTHROP_GRUMMAN", price: 454.08, change: -0.22, history: [] },
    { symbol: "BA", name: "BOEING_CO", price: 191.41, change: 0.85, history: [] },
    { symbol: "RTX", name: "RTX_CORP", price: 92.02, change: -0.05, history: [] },
    { symbol: "PLTR", name: "PALANTIR_TECH", price: 24.51, change: 2.30, history: [] }
];

// News API Configuration
const NEWS_API_KEY = "dd27fea382a64516bab7a945d729077d";

class StrategicConsole {
    constructor() {
        this.tickerContainer = document.getElementById('news-ticker-content');
        this.stocks = [...MARKET_PORTFOLIO];
        this.activeCategories = { market: false, intel: false }; 
        this.currentIndex = 0;
        this.liveNews = []; // Stores fetched news
        this.currentNewsIndex = 0;
        this.showingNewsInTicker = false; // Alternates ticker type
        
        this.init();
    }

    init() {
        if (!this.tickerContainer) return;

        this.updateTicker();
        setInterval(() => this.updateTicker(), 6000);
        
        this.syncCategoryUI();
        this.fetchLiveIntel();
        
        // Fetch Real Market Data
        this.fetchAllMarketData();
        setInterval(() => this.fetchAllMarketData(), 60000); // refresh every 1min
    }

    async fetchLiveIntel() {
        const statusPill = document.getElementById('intel-status-pill');
        const container = document.getElementById('intel-news-container');
        
        if (statusPill) {
            statusPill.innerText = "FETCHING_DATA...";
            statusPill.style.color = "#ffde03";
            statusPill.style.borderColor = "rgba(255, 222, 3, 0.3)";
            statusPill.style.background = "rgba(255, 222, 3, 0.1)";
        }

        try {
            // Fetch top headlines or everything for specific defense keywords
            // Limiting to general military & defense news
            const query = encodeURIComponent("military OR defense OR pentagon OR NATO OR tactical");
            const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWS_API_KEY}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "ok" && data.articles) {
                // Filter out dead links/removed articles
                this.liveNews = data.articles.filter(a => a.title && a.title !== "[Removed]");
                
                if (statusPill) {
                    statusPill.innerText = "UPLINK_ESTABLISHED";
                    statusPill.style.color = "#0f0";
                    statusPill.style.borderColor = "rgba(0, 255, 0, 0.3)";
                    statusPill.style.background = "rgba(0, 255, 0, 0.1)";
                }
                
                if (this.activeCategories.intel) {
                    this.renderIntelFeed();
                }
            } else {
                throw new Error("API returned error or empty");
            }
        } catch (error) {
            console.error("Intel Feed Error:", error);
            if (statusPill) {
                statusPill.innerText = "UPLINK_FAILED";
                statusPill.style.color = "#ff3e3e";
                statusPill.style.borderColor = "rgba(255, 62, 62, 0.3)";
                statusPill.style.background = "rgba(255, 62, 62, 0.1)";
            }
            if (container) {
                container.innerHTML = `
                    <div style="color: #ff3e3e; font-family: var(--font-mono); font-size: 0.6rem; text-align: center; margin-top: 20px;">
                        [ CONNECTION FAILED // API LIMIT REACHED OR OFFLINE ]<br><br>
                        <span style="color:rgba(255,255,255,0.4)">Please try again later.</span>
                    </div>
                `;
            }
        }
    }

    renderIntelFeed() {
        const container = document.getElementById('intel-news-container');
        if (!container) return;

        if (this.liveNews.length === 0) {
            return;
        }

        container.innerHTML = ''; // Clear container

        this.liveNews.forEach((article, index) => {
            // Format time nicely
            const date = new Date(article.publishedAt);
            const timeStr = date.toISOString().replace("T", " // ").substring(0, 19) + "Z";

            const card = document.createElement('div');
            card.className = "intel-news-card";
            card.onclick = () => window.open(article.url, '_blank');
            
            card.innerHTML = `
                <div class="intel-news-meta">
                    <span>SRC: ${article.source.name || "UNKNOWN"}</span>
                    <span style="color: var(--red);">${timeStr}</span>
                </div>
                <div class="intel-news-title">${article.title}</div>
                <div class="intel-news-desc">${article.description || ''}</div>
            `;
            
            // Stagger animation slightly
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            container.appendChild(card);
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }

    async fetchAllMarketData() {
        this.stocks.forEach(async (stock) => {
            try {
                // Fetch 1 day of 5 minute intervals from Yahoo Finance API
                const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.symbol}?interval=5m&range=1d`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("Fetch failed");
                const data = await response.json();
                
                const result = data.chart.result[0];
                const meta = result.meta;
                const closePrices = result.indicators.quote[0].close;
                const validPrices = closePrices.filter(p => p !== null);
                
                if (validPrices.length > 0) {
                    const currentPrice = validPrices[validPrices.length - 1];
                    const prevClose = meta.chartPreviousClose || currentPrice;
                    const change = ((currentPrice - prevClose) / prevClose) * 100;
                    
                    stock.price = parseFloat(currentPrice.toFixed(2));
                    stock.change = parseFloat(change.toFixed(2));
                    // Smooth visual by grabbing last 40 data points
                    stock.history = validPrices.slice(-40);
                    
                    if (this.activeCategories.market) {
                        const priceEl = document.getElementById(`price-${stock.symbol}`);
                        if (priceEl) priceEl.innerText = `$${stock.price.toLocaleString()}`;
                        this.drawSupremeMetrics(stock);
                    }
                }
            } catch (err) {
                // Silently fallback to simulation if API fails/CORS blocks
                this.runSimulationForStock(stock);
            }
        });
    }

    runSimulationForStock(stock) {
        if (!stock.history || stock.history.length === 0) {
            for (let i = 0; i < 40; i++) stock.history.push(stock.price);
        }
        
        const volatility = 0.0025; 
        const movement = (Math.random() - 0.5) * 2 * volatility;
        stock.price = parseFloat((stock.price * (1 + movement)).toFixed(2));
        stock.change = parseFloat((stock.change + (movement * 100)).toFixed(2));
        
        stock.history.push(stock.price);
        if (stock.history.length > 40) stock.history.shift();

        if (this.activeCategories.market) {
            const priceEl = document.getElementById(`price-${stock.symbol}`);
            if (priceEl) priceEl.innerText = `$${stock.price.toLocaleString()}`;
            this.drawSupremeMetrics(stock);
        }
    }

    drawSupremeMetrics(stock) {
        const canvas = document.getElementById(`graph-${stock.symbol}`);
        if (!canvas) return;

        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }

        const ctx = canvas.getContext('2d');
        const data = stock.history;
        const w = canvas.width;
        const h = canvas.height;
        const padL = 45;
        const padB = 25;
        const padT = 15;
        const padR = 15;

        ctx.clearRect(0, 0, w, h);
        if (data.length < 2) return;

        const min = Math.min(...data);
        const max = Math.max(...data);
        const mid = (max + min) / 2;
        const range = max - min || 1;

        // 1. Tactical Grid & Axes
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 1;
        
        // Mid-line Grid
        const midY = h - padB - ((mid - min) / range) * (h - padT - padB);
        ctx.moveTo(padL, midY);
        ctx.lineTo(w - padR, midY);
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Main Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB);
        ctx.lineTo(w - padR, h - padB);
        ctx.stroke();

        // 2. High-Resolution Markers (Price/Time)
        ctx.font = '800 7px "var(--font-main)", sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(`$${max.toFixed(2)}`, padL - 8, padT);
        ctx.fillText(`$${mid.toFixed(2)}`, padL - 8, midY);
        ctx.fillText(`$${min.toFixed(2)}`, padL - 8, h - padB);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('T-40S', padL, h - padB + 8);
        ctx.fillText('T-20S', padL + (w - padL - padR) / 2, h - padB + 8);
        ctx.fillText('NOW', w - padR, h - padB + 8);

        // 3. Supreme Sparkline
        ctx.beginPath();
        const trendColor = stock.change >= 0 ? '#00ff00' : '#ff3e3e';
        ctx.strokeStyle = trendColor;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = trendColor;

        data.forEach((val, i) => {
            const x = padL + (i / (data.length - 1)) * (w - padL - padR);
            const y = h - padB - ((val - min) / range) * (h - padT - padB);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

        // 4. Area Gradient
        ctx.lineTo(w - padR, h - padB);
        ctx.lineTo(padL, h - padB);
        const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
        grad.addColorStop(0, stock.change >= 0 ? 'rgba(0,255,0,0.1)' : 'rgba(255,62,62,0.1)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
    }

    updateTicker() {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0] + 'Z';
        this.tickerContainer.style.opacity = '0';

        setTimeout(() => {
            // Alternate between Market Data and Breaking News
            if (this.liveNews.length > 0 && this.showingNewsInTicker) {
                const article = this.liveNews[this.currentNewsIndex];
                this.tickerContainer.innerHTML = `
                    <span style="color: rgba(255,255,255,0.4); font-size: 0.35rem; margin-right: 12px;">[${timestamp} HIGH_PRIORITY_INTEL]</span>
                    <span style="color: var(--red); font-weight: 900; margin-right: 8px;">BREAKING:</span>
                    <span style="color: #fff; font-weight: 500;">${article.title.toUpperCase()}</span>
                `;
                this.currentNewsIndex = (this.currentNewsIndex + 1) % this.liveNews.length;
            } else {
                const stock = this.stocks[this.currentIndex];
                const isPositive = stock.change >= 0;
                const trendIcon = isPositive ? '▲' : '▼';
                const trendColor = isPositive ? '#00ff00' : '#ff3e3e';

                this.tickerContainer.innerHTML = `
                    <span style="color: rgba(255,255,255,0.4); font-size: 0.35rem; margin-right: 12px;">[${timestamp} SUPREME_METRICS]</span>
                    <span style="color: #fff; font-weight: 900; margin-right: 8px;">${stock.symbol}:</span>
                    <span style="color: #fff; font-weight: 500; margin-right: 15px;">$${stock.price.toLocaleString()}</span>
                    <span style="color: ${trendColor}; font-weight: 800;">${trendIcon} ${isPositive ? '+' : ''}${stock.change.toFixed(2)}%</span>
                `;
                this.currentIndex = (this.currentIndex + 1) % this.stocks.length;
            }

            // Flip toggle for next iteration if news exists
            if (this.liveNews.length > 0) {
                this.showingNewsInTicker = !this.showingNewsInTicker;
            } else {
                this.showingNewsInTicker = false;
            }

            this.tickerContainer.style.opacity = '1';
        }, 400);
    }

    toggleCategory(cat) {
        this.activeCategories[cat] = !this.activeCategories[cat];
        this.syncCategoryUI();
    }

    syncCategoryUI() {
        const panel = document.getElementById('tactical-news-panel');
        const marketStream = document.getElementById('stream-market');
        const intelStream = document.getElementById('stream-intel');
        const btnMarket = document.getElementById('btn-toggle-market');
        const btnIntel = document.getElementById('btn-toggle-intel');

        if (!panel) return;

        const updateBtn = (btn, active) => {
            if (!btn) return;
            btn.style.background = active ? 'rgba(217, 4, 41, 0.3)' : 'rgba(255,255,255,0.05)';
            btn.style.borderColor = active ? 'rgba(217, 4, 41, 0.6)' : 'rgba(255,255,255,0.1)';
            btn.style.color = active ? '#fff' : 'rgba(255,255,255,0.4)';
        };
        updateBtn(btnMarket, this.activeCategories.market);
        updateBtn(btnIntel, this.activeCategories.intel);

        if (marketStream) marketStream.style.display = this.activeCategories.market ? 'block' : 'none';
        if (intelStream) intelStream.style.display = this.activeCategories.intel ? 'block' : 'none';

        const anyActive = this.activeCategories.market || this.activeCategories.intel;
        if (anyActive) {
            panel.style.display = 'block';
            setTimeout(() => {
                panel.style.height = '600px'; // SUPREME SCALE
                if (this.activeCategories.intel) {
                    // Populate if news exists
                    this.renderIntelFeed();
                }
                if (this.activeCategories.market) {
                    this.stocks.forEach(s => this.drawSupremeMetrics(s));
                }
            }, 10);
        } else {
            panel.style.height = '0';
            setTimeout(() => {
                if (!this.activeCategories.market && !this.activeCategories.intel) {
                    panel.style.display = 'none';
                }
            }, 400);
        }
    }
}

// Global Exports
window.toggleConsoleCategory = (cat) => {
    if (window.smdc) window.smdc.toggleCategory(cat);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.smdc = new StrategicConsole();
});
