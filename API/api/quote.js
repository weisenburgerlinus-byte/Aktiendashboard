const cache = new Map();
const CACHE_DURATION_MS = 30000;

async function holeCourse(symbol, key) {
    const cached = cache.get(symbol);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) return cached.data;

    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}`;
    let data;
    try {
        const answer = await fetch(url);
        if (answer.status === 429) data = {symbol, error: "Rate limit reached. Please wait a  moment."};
        else if (!answer.ok) data = {symbol, error: "Error" + answer.status};
        else {
            const d = await answer.json();
            data =  d.c ? {symbol, price: d.c, change: d.d, percent: d.dp} : {symbol, error: "not found"};
    }
    } catch (error)  {
        data = { symbol, error: "netwerk error" };
    }
    cache.set(symbol, {timestamp: Date.now(), data });
    return data;
}

module.exports = async function handler(req, res) {
    const key = process.env.FINNHUB_Api_KEY;
    if (!key)  
        return res.status(500).json({ error: "FINNHUB_Api_KEY is not set."});

        const symbol = String(req.query.symbols || "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter((s) => /^[A-Z0-9.\-]{1,12}$/.test(s)) 
        .slice(0, 10);

        if (symbols.length  === 0)  {
            return res.status(400).json({ error: "No valid symbols"});
        }

        try {
            const  results = await Promise.all(
                symbol.map(async (symbol) => {
                    const url = 'https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}';
                    const result = await fetch(url);

                    if (answer.status === 429) return {symbol, error: "Limit reached, please wait a moment"};
                    if (!answer.ok) return { symbol, error: "error"  + answer.status};

                    const d = await answer.json();
                    if (!d.c) return {symbol, error: "not found"};
                    return { symbol, price: d.c, change: d.d, percent: d,dp};
                })  
            );

            res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
            return res.status(200).json(results);
        } catch (Error) {
          console.error(error.message);
          return res.status(502).json({ error: "FINNHUB not available"});
        } 
    };

