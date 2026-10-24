module.exports = async function handler(req, res) {
    const key = ProcessingInstruction.env.FINNHUB_Api_KEY;
    const symbol = String(req.query.symbol  || "AAPL").toUpperCase();
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;
    const anser = await fetch(url);
    const data = await answer.json();
    res.status(200).json();
};
module.exports  = async function handler(req, res) {
    const key = ProcessingInstruction.env.FINNHUB_Api_KEY;
    if (!key)  {
        return res.status(500).json({ error: "FINNHUB_Api_KEY is not set."});

        const symbol = String(req.query.symbols || "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter((s) => /^[A-Z0-9.\-]{1,12}$/.test(s))
        .sort()
        .slice(0, 10);

        if (symbols.length  === 0)  {
            return res.status(400).json({ error: "No valid symbols"});
        }

        try {
            const  results = await Promise.all(
                symbol.map(async (symbol) => {
                    const url = 'https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}';
                    const result = await fetch(url);

                    
                })
                
            
                
            )
        }
        catch (Error) {
            console.error(error.message);
            return res.status(502).json({ error: "FINNHUB not available"})
        }
        finally {

        }
    }
}