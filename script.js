 
const stocks = [
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
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        category: "tech",
        price: 420.00,
        change: "+0.80%",
        positive: true,
        mcap: "$3.1 T",
        pe: "35.0",
        high: "$468.35",
        low: "$385.58",
        history: {
            "1D": [416, 418, 417, 419, 420, 420],
            "1W": [410, 413, 412, 416, 418, 419, 420],
            "1M": [395, 400, 403, 408, 512, 416, 420],
            "1Y": [370, 380, 392, 400, 408, 415, 420]
                }
    },
    {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        category: "Tech",
        price: 145.00,
        change: "+2.10%",
        positive: true,
        mcap: "$3.5 T",
        pe: "55.0",
        high: "$153.00",
        low: "$68.00",
        history:  {
            "1D": [141, 142, 140, 143, 144, 145],
            "1W": [136, 138, 137, 140, 141, 143, 145],
            "1M": [125, 129, 132, 136, 139, 142, 145],
            "1Y": [80, 92, 105, 118, 130, 138, 145]
        }
    },
    {
        symbol: "AMZN",
        name: "Amazon.com, Inc.",
        category: "Tech",
        price: 220.00,
        change: "+o.45",
        positive: true,
        mcap: "$2.3 T",
        pe: "40.0",
        high: "$242.00",
        low: "$161.00",
        history: {
            "1D": [218, 219, 218.5, 219, 219.5, 220],
            "1W": [214, 215, 216, 217, 216.5, 219, 220],
            "1M": [205, 208, 211, 214, 216, 218, 220],
            "1Y": [165, 175, 185, 195, 205, 214, 220]
        }
    },
    {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        category: "Automotive",
        price: 350.00,
        change: "-1.20%",
        positive: false,
        mcap: "1.1 T",
        pe: "180.0",
        high: "$488.00",
        low: "$214.00",
        history: {
            "1D": [357, 355, 358, 354, 352, 350],
            "1W": [360, 358, 355, 357, 353, 354, 350],
            "1M": [380, 375, 370, 365, 360, 355, 350],
            "1Y": [220, 250, 290, 330, 380, 365, 350]
        }


    },
    {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        category: "Finance",
        price: 290.00,
        change: "+3.00%",
        positive: true,
        mcap: "$820 B",
        pe: "13.0",
        high: "$300.00",
        low: "$200.00",
        history: {
            "1D": [288, 289, 288.5, 289, 290, 290],
            "1W": [284, 285, 286, 287, 286.5, 289, 290],
            "1M": [270, 274, 278, 282, 285, 288, 290],
            "1Y": [205, 220, 238, 252, 268, 280, 290]

        }
    },
    {
        symbol:"V",
        name: "Visa Inc.",
        category: "Finance",
        price: 300.00,
        change: "+0.50%",
        positive: true,
        mcap: "$600 B",
        pe: "30.0",
        high: "$320.00",
        low: "$250.00",
        history: {
            "1D": [297,298,297.5,299,299.5,300],
            "1W": [294, 295, 296, 297, 298, 299, 300],
            "1M": [285, 288, 291,  294, 296, 298, 300],
            "1Y": [260, 268, 275, 282, 288, 295, 300] 
        }
    },
    {
        symbol: "TM",
        name: "Toyota Motor Corporation",
        category: "Automotive",
        price: 190.00,
        change: "+0.60%",
        positive: true,
        mcap: "$250 B",
        pe: "10.0",
        high: "$200.00",
        low: "$150.00",
        history: {
            "1D": [188, 189, 188.5, 189, 189.5, 190],
            "1W": [185, 186, 187, 188, 187.5, 189, 190],
            "1M": [178, 181, 183, 185, 187, 189, 190],
            "1Y": [155, 162, 170, 176, 182, 187, 190]
        }    
    }
    


];


let selectedStock = stocks[0];
let selectedTimeframe = "1W";
let selectedCategory = "All";
let stockChart = null;



function renderStocks() {
    const grid = document.getElementById("stockGrid");
    const searchInput = document.getElementById("searchInput");

    if (!grid) return;

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    grid.innerHTML = "";

    const filteredStocks = stocks.filter(stock => {
        const matchesSearch =
            stock.name.toLowerCase().includes(searchTerm) ||
            stock.symbol.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            stock.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    if (filteredStocks.length === 0) {
        grid.innerHTML = `
            <p class="text-stone-400 col-span-full">
            </p>
        `;
        return;
    }

    filteredStocks.forEach(stock => {
        const isSelected = stock.symbol === selectedStock.symbol;
        const card = document.createElement("div");

        card.className = `
            bg-stone-900 border
            ${isSelected
                ? "border-stone-500 shadow-stone-500/10"
                : "border-stone-800 hover:border-stone-700"}
            rounded-2xl p-5 cursor-pointer transition shadow-lg group
        `;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <span class="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md font-mono">
                        ${stock.symbol}
                    </span>
                    <h3 class="font-bold text-stone-100 mt-2.5 group-hover:text-blue-400 transition">
                        ${stock.name}
                    </h3>
                </div>
                <span class="text-xs font-medium text-stone-500">
                    ${stock.mcap}
                </span>
            </div>

            <div class="flex justify-between items-end mt-4">
                <span class="text-2xl font-black text-white">
                    $${stock.price.toFixed(2)}
                </span>
                <span class="text-xs font-bold px-2 py-1 rounded-md ${
                    stock.positive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-rose-400 bg-rose-500/10"
                }">
                    ${stock.change}
                </span>
            </div>
        `;

        card.addEventListener("click", () => selectStock(stock));
        grid.appendChild(card);
    });
}


function updateDetails() {
    document.getElementById("chartTitle").textContent = selectedStock.name;
    document.getElementById("chartTicker").textContent = selectedStock.symbol;
    document.getElementById("chartCategory").textContent = selectedStock.category;
    document.getElementById("chartPrice").textContent =
        "$" + selectedStock.price.toFixed(2);

    const changeElement = document.getElementById("chartChange");
    changeElement.textContent = selectedStock.change;
    changeElement.className = `
        text-sm font-semibold px-2.5 py-1 rounded-lg
        ${selectedStock.positive
            ? "text-emerald-400 bg-emerald-500/10"
            : "text-rose-400 bg-rose-500/10"}
    `;

    document.getElementById("mcapVal").textContent = selectedStock.mcap;
    document.getElementById("peVal").textContent = selectedStock.pe;
    document.getElementById("highVal").textContent = selectedStock.high;
    document.getElementById("lowVal").textContent = selectedStock.low;
}



function renderChart() {
    const canvas = document.getElementById("stockChart");

    if (!canvas) return;

    if (typeof Chart === "undefined") {
        console.error;
        return;
    }

    const dataPoints =
        selectedStock.history[selectedTimeframe] ||
        selectedStock.history["1W"];

    if (stockChart) {
        stockChart.destroy();
    }

    const lineColor = selectedStock.positive ? "#34d399" : "#f87171";
    const fillColor = selectedStock.positive
        ? "rgba(52, 211, 153, 0.12)"
        : "rgba(248, 113, 113, 0.12)";

    stockChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: dataPoints.map((_, index) => index + 1),
            datasets: [{
                label: selectedStock.symbol,
                data: dataPoints,
                borderColor: lineColor,
                backgroundColor: fillColor,
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: "#a8a29e" },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: "#a8a29e" },
                    grid: { color: "rgba(120, 113, 108, 0.2)" }
                }
            }
        }
    });
}


function selectStock(stock) {
    selectedStock = stock;
    updateDetails();
    renderChart();
    renderStocks();
}


function setTimeframe(timeframe) {
    selectedTimeframe = timeframe;

    document.querySelectorAll(".tf-btn").forEach(button => {
        const isActive =
            button.getAttribute("onclick") === `setTimeframe('${timeframe}')`;

        button.classList.toggle("active-tf", isActive);
        button.classList.toggle("bg-stone-800", isActive);
        button.classList.toggle("text-white", isActive);
        button.classList.toggle("text-stone-400", !isActive);
    });

    renderChart();
}

function filterCategory(category) {
    selectedCategory = category;

    document.querySelectorAll(".cat-btn").forEach(button => {
        const isActive =
            button.getAttribute("onclick") === `filterCategory('${category}')`;

        button.classList.toggle("active-cat", isActive);
        button.classList.toggle("bg-gray-600", isActive);
        button.classList.toggle("text-white", isActive);
        button.classList.toggle("bg-stone-900", !isActive);
        button.classList.toggle("text-stone-400", !isActive);
    });

    renderStocks();
}


function initDashboard() {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", renderStocks);
    }

    renderStocks();
    updateDetails();
    renderChart();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboard);
} else {
    initDashboard();
}