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
            card.className = `bg-stone-900 border ${isSelected ? 'border-stone-500 shadow-stone-500/10' : 'border-stone-800 hover:border-stone-700'} rounded-2xl p-5 cursor-pointer transition shadow-lg relative group`;
            card.onclick = () =>  selectStock(stock);

            card.innerHTML =`
                <div class="flex justify-between item-start mb-3">
                    <div>
                        <span class="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md font-mono">${stock.symbol}</span>
                        <h3 class="font-bold text-stone-100  mt-2.5  group-hover:text-blue-400 transition">${stock.name}</h3>
                    </div>
                    <span class="text-xs font-medium text-stone-500">${stock.mcap}</span>
                </div>
                <div class="flex justify-between items-end mt-4">
                    <span class="text-2xl font-black text-white">$${stock.price.toFixed(2)}</span>
                    <span class="text-xs font-bold px-2 py-1 rounded-md ${stock.positive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}">
                        ${stock.change}
                    </span>
                </div>
             `;
             grid.appendChild(card);
        });
        }
        function renderChart() {
            const canvas = document.getElementById("stockChart");
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            const dataPoints =
                selectedStock.history[selectedTimeframe] || selectedStock.history["1W"];
                if (stockChart) {
                    stockChart.destroy();
                }
                stockChart =  new Chat(ctx, {
                    type: "line",
                    data: {
                        labels: dataPoints.map((_, index) => index + 1),
                        datasets: [{
                            label: selectedStock.symbol,
                            data:  dataPoints,
                            borderColor: selectedStock.positive ?  "#34d399" : "#f87171",
                            borderWidth: 2,
                            fill: false,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend:  { display: false } }
                    }
                });
        }
       function updateDetails() {
        document.getElementById("chartTitle").innerText = selectedStock.name;
        document.getElementById("chartTicker").innerText = selectedStock.symbol;
        document.getElementById("chartCategory").innerText = selectedStock.category;
        document.getElementById("chartPrice").innerText = "$" + selectedStock.price.toFixed(2);

        const changeEl =  document.getElementById("chartChange");
        changeEl.innerText =  selectedStock.change;

        if (selectedStock.positive) {
            changeEl.className = "text-sm font-semibold px-2.5 py-1 rounded-lg text-emerald-400 bg-emerald-500/10"
        } else {
            changeEl.className = "text.sm font-semibold px-2.5 py-1 rounded-lg text-rose-400 bg-rose-500/10";
        }

        document.getElementById("mcapVal").innerText = selectedStock.mcap;
        document.getElementById("peVal").innerText = selectedStock.pe;
        document.getElementById("highVal").innerText = selectedStock.high;
        document.getElementById("lowVal").innerText = selectedStock.low;

        renderStocks();
        

       } 

 