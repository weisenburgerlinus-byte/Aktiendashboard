   const stocks =[
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        category: "Tech",
        price: 232.40,
        change: "+1.25%",
        positive: true,
        mcap: "$3.52 T",
        pe: "33.4",
        high: "$237.23",
        low: "$164.08",
        history: {
            "1D": [230.1, 231.0, 230.5, 231.8, 232.0, 232.4],
            "1W": [228.0, 229.2, 230.1, 231.5, 230.8, 231.2, 232.4],
            "1M": [218.0, 220.5, 222.1, 225.0, 228.4, 230.0, 232.4],
            "1Y": [170.5, 182.0, 195.4, 210.2, 220.0, 228.0, 232.4]
        }

    }

    ]

    let selectedStock =stocks[0];
    let selectedTimeframe = "1W";
    let selectedCategory= "All";
    let stockChart = null;

    function renderStocks() {
        const grid = document.getElementById("stockGrid")
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        grid.innerHTML = "";
        
        const filteredStocks = stocks.filter(stock =>{
            const matchesSearch = stock.name.toLowerCase().includes(searchTerm) || stock.symbol.toLowerCase().includes(searchTerm);
            const matchesCategory =selectedCategory === "All" || stock.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        filteredStocks.forEach(stock => {
            const isSelected = stock.symbol === selectedStock.symbol;
            const card = document.createElement("div");
            card.className = `bg-stone-900 border ${isSelected ? 'border-stone-500 shadow-stone-500/10' : 'border-stone-800 hover:border-stone-700'} rounded-2xl p-5 curser-pointer transition shadow-lg relative group`;
            card.onclick =  selectedStock(stock);

            card.innerHTML =`
                <div class="flex justify-between item-start mb.3">
                    <div>
                        <span class="text-xs font-bold text-white-400 bg-white-500/10 px-2.5 py-1 rounded-md font-mono">${stock.symbol}</span>
                        <h3 class="font-bold text-stone-100  mt-2.5  group-hover:text-white-400 transition">${stock.name}</h3>
                    </div>
                    <span class="text-xxs font-medium text-stone-500">${stock.mcap}</span>
                </div>
                <div class="flex justify-between items-end mt-4">
                    <span class="text-2xl font-black text-white">$${stock.price.toFixed(2)}</span>
                    <span class="text-xs font-bold px-2 py-1 rounded-md ${stock.positive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}">
                        ${stock.chance}
                    </span>
                </div>
             `;
             grid.appendChild(card);
        });
        }


