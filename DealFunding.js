<!D<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-ASIN Deal Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Amazon Ember", Arial, sans-serif;
            background-color: #EAEDED;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 30px;
        }
        
        h1 {
            color: #232F3E;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .subtitle {
            color: #565959;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        .input-section {
            background-color: #F7F8F8;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .input-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #0F1111;
            font-size: 14px;
        }
        
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #D5D9D9;
            border-radius: 4px;
            font-size: 14px;
            font-family: monospace;
            resize: vertical;
        }
        
        input[type="number"] {
            padding: 10px;
            border: 1px solid #D5D9D9;
            border-radius: 4px;
            font-size: 14px;
            width: 150px;
        }
        
        textarea:focus, input:focus {
            outline: none;
            border-color: #F90;
            box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.2);
        }
        
        button {
            background-color: #FF9900;
            color: #0F1111;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 10px;
            margin-top: 10px;
        }
        
        button:hover {
            background-color: #FA8900;
        }
        
        button:disabled {
            background-color: #D5D9D9;
            cursor: not-allowed;
        }
        
        .loading {
            display: none;
            color: #565959;
            font-style: italic;
            margin-top: 10px;
        }
        
        .deal-params {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 13px;
        }
        
        th {
            background-color: #232F3E;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #D5D9D9;
        }
        
        tr:hover {
            background-color: #F7F8F8;
        }
        
        .warning {
            background-color: #FFF4E5;
            color: #0F1111;
        }
        
        .success {
            background-color: #E8F5E9;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .card {
            background-color: #F7F8F8;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #FF9900;
        }
        
        .card-label {
            font-size: 12px;
            color: #565959;
            margin-bottom: 5px;
        }
        
        .card-value {
            font-size: 24px;
            font-weight: 700;
            color: #0F1111;
        }
        
        .results-section {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Multi-ASIN Deal Intelligence Assistant</h1>
        <p class="subtitle">Bulk calculate deal economics with automated data fetching</p>
        
        <div class="input-section">
            <div class="input-group">
                <label>Enter ASINs (one per line, up to 100)</label>
                <textarea id="asinInput" rows="6" placeholder="B0FLLR96JAA&#10;B001ABCD123&#10;B002EFGH456"></textarea>
            </div>
            
            <button onclick="fetchAsinData()">🔄 Fetch ASIN Data (Mock API)</button>
            <div class="loading" id="loading">⏳ Fetching data from mock database...</div>
        </div>
        
        <div class="results-section" id="resultsSection">
            <h2 style="color: #232F3E; margin: 20px 0;">📦 Fetched ASINs</h2>
            
            <div class="input-section">
                <h3 style="color: #232F3E; margin-bottom: 15px;">Deal Parameters</h3>
                <div class="deal-params">
                    <div class="input-group">
                        <label>Discount (%)</label>
                        <input type="number" id="discount" value="25" step="1" min="0" max="100">
                    </div>
                    <div class="input-group">
                        <label>Deal Lift Multiplier</label>
                        <input type="number" id="dealLift" value="3" step="0.1" min="1">
                    </div>
                    <div class="input-group">
                        <label>Deal Duration (days)</label>
                        <input type="number" id="dealDuration" value="2" step="1" min="1">
                    </div>
                </div>
                <button onclick="calculateAllDeals()">💰 Calculate Deal Economics</button>
            </div>
            
            <div id="summarySection" style="display:none;">
                <h2 style="color: #232F3E; margin: 30px 0 15px 0;">📊 Deal Summary</h2>
                <div class="summary-cards">
                    <div class="card">
                        <div class="card-label">Total ASINs</div>
                        <div class="card-value" id="totalAsins">0</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Total Forecasted Units</div>
                        <div class="card-value" id="totalUnits">0</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Total Deal Funding</div>
                        <div class="card-value" id="totalFunding">$0</div>
                    </div>
                    <div class="card">
                        <div class="card-label">Avg. Funding Per Unit</div>
                        <div class="card-value" id="avgFunding">$0</div>
                    </div>
                </div>
            </div>
            
            <div style="overflow-x: auto;">
                <table id="resultsTable">
                    <thead>
                        <tr>
                            <th>ASIN</th>
                            <th>Item Name</th>
                            <th>Current Price</th>
                            <th>Basis Price</th>
                            <th>HAMP T30D</th>
                            <th>T4W Units</th>
                            <th>T4W CPPU</th>
                            <th>Deal Price</th>
                            <th>Funding/Unit</th>
                            <th>Forecast Units</th>
                            <th>Total Funding</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // MOCK DATABASE - In production, this would be DynamoDB
        const mockDatabase = {
            'B0FLLR96JAA': {
                itemName: 'VIPES FOR HOME - Kitchen Wipes',
                currentPrice: 19.99,
                basisPrice: 19.99,
                hampT30D: 18.99,
                t4wUnits: 143,
                t4wCPPU: -2.12
            },
            'B001ABC1234': {
                itemName: 'Premium Paper Towels 12-Pack',
                currentPrice: 24.99,
                basisPrice: 22.50,
                hampT30D: 22.99,
                t4wUnits: 250,
                t4wCPPU: 3.45
            },
            'B002DEF5678': {
                itemName: 'Eco-Friendly Cleaning Spray',
                currentPrice: 12.99,
                basisPrice: 10.50,
                hampT30D: 11.99,
                t4wUnits: 180,
                t4wCPPU: 2.87
            },
            'B003GHI9012': {
                itemName: 'Multi-Surface Disinfectant',
                currentPrice: 15.99,
                basisPrice: 13.00,
                hampT30D: 14.99,
                t4wUnits: 320,
                t4wCPPU: 4.12
            },
            'B004JKL3456': {
                itemName: 'Microfiber Cleaning Cloths 24pk',
                currentPrice: 18.99,
                basisPrice: 16.50,
                hampT30D: 17.99,
                t4wUnits: 95,
                t4wCPPU: 1.95
            },
            'B005MNO7890': {
                itemName: 'Glass Cleaner Refill 64oz',
                currentPrice: 9.99,
                basisPrice: 8.25,
                hampT30D: 9.49,
                t4wUnits: 210,
                t4wCPPU: 2.34
            }
        };
        
        // Store fetched ASIN data
        let fetchedData = [];
        
        // SIMULATED API CALL - Fetches data from "database"
        function fetchAsinData() {
            // Get ASINs from textarea
            const input = document.getElementById('asinInput').value;
            const asins = input.split('\n')
                .map(a => a.trim().toUpperCase())
                .filter(a => a.length > 0);
            
            if (asins.length === 0) {
                alert('Please enter at least one ASIN');
                return;
            }
            
            if (asins.length > 100) {
                alert('Maximum 100 ASINs allowed');
                return;
            }
            
            // Show loading
            document.getElementById('loading').style.display = 'block';
            
            // Simulate API delay
            setTimeout(() => {
                fetchedData = [];
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';
                
                // "Fetch" each ASIN from mock database
                asins.forEach(asin => {
                    const data = mockDatabase[asin];
                    
                    if (data) {
                        // ASIN found in database
                        fetchedData.push({
                            asin: asin,
                            ...data
                        });
                        
                        // Add row to table
                        const row = tableBody.insertRow();
                        row.innerHTML = `
                            <td><strong>${asin}</strong></td>
                            <td>${data.itemName}</td>
                            <td>$${data.currentPrice.toFixed(2)}</td>
                            <td>$${data.basisPrice.toFixed(2)}</td>
                            <td>$${data.hampT30D.toFixed(2)}</td>
                            <td>${data.t4wUnits}</td>
                            <td class="${data.t4wCPPU < 0 ? 'warning' : ''}">$${data.t4wCPPU.toFixed(2)}</td>
                            <td colspan="4" style="color: #565959; font-style: italic;">Click "Calculate Deal Economics"</td>
                        `;
                    } else {
                        // ASIN not found
                        const row = tableBody.insertRow();
                        row.className = 'warning';
                        row.innerHTML = `
                            <td><strong>${asin}</strong></td>
                            <td colspan="10" style="color: #B12704;">⚠️ ASIN not found in database</td>
                        `;
                    }
                });
                
                // Hide loading, show results
                document.getElementById('loading').style.display = 'none';
                document.getElementById('resultsSection').style.display = 'block';
                
                // Show summary
                alert(`✅ Fetched ${fetchedData.length} of ${asins.length} ASINs successfully`);
                
            }, 1500); // 1.5 second fake delay to simulate API call
        }
        
        // CALCULATE DEAL ECONOMICS FOR ALL ASINs
        function calculateAllDeals() {
            if (fetchedData.length === 0) {
                alert('No ASIN data to calculate. Please fetch ASINs first.');
                return;
            }
            
            // Get deal parameters
            const discount = parseFloat(document.getElementById('discount').value);
            const dealLift = parseFloat(document.getElementById('dealLift').value);
            const dealDuration = parseFloat(document.getElementById('dealDuration').value);
            
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            let totalUnits = 0;
            let totalFunding = 0;
            let totalFundingPerUnit = 0;
            
            // Calculate for each ASIN
            fetchedData.forEach(data => {
                // Deal Price calculation
                const discountedPrice = data.currentPrice * (1 - discount / 100);
                const dealPrice = Math.min(discountedPrice, data.hampT30D);
                const finalDealPrice = Math.floor(dealPrice * 100) / 100;
                
                // Funding calculation
                const fundingPerUnit = data.basisPrice - finalDealPrice;
                const roundedFunding = Math.round(fundingPerUnit * 100) / 100;
                
                // Forecast calculation
                const weeksInDeal = dealDuration / 7;
                const forecastedUnits = Math.round(data.t4wUnits * dealLift * weeksInDeal);
                
                // Total funding
                const dealTotalFunding = roundedFunding * forecastedUnits;
                
                // Add to totals
                totalUnits += forecastedUnits;
                totalFunding += dealTotalFunding;
                totalFundingPerUnit += roundedFunding;
                
                // Add row
                const row = tableBody.insertRow();
                const rowClass = data.t4wCPPU < 0 ? 'warning' : 'success';
                row.className = rowClass;
                row.innerHTML = `
                    <td><strong>${data.asin}</strong></td>
                    <td>${data.itemName}</td>
                    <td>$${data.currentPrice.toFixed(2)}</td>
                    <td>$${data.basisPrice.toFixed(2)}</td>
                    <td>$${data.hampT30D.toFixed(2)}</td>
                    <td>${data.t4wUnits}</td>
                    <td>$${data.t4wCPPU.toFixed(2)}</td>
                    <td><strong>$${finalDealPrice.toFixed(2)}</strong></td>
                    <td><strong>$${roundedFunding.toFixed(2)}</strong></td>
                    <td><strong>${forecastedUnits.toLocaleString()}</strong></td>
                    <td><strong>$${dealTotalFunding.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></td>
                `;
            });
            
            // Update summary cards
            document.getElementById('totalAsins').textContent = fetchedData.length;
            document.getElementById('totalUnits').textContent = totalUnits.toLocaleString();
            document.getElementById('totalFunding').textContent = '$' + totalFunding.toLocaleString('en-US', {minimumFractionDigits: 2});
            document.getElementById('avgFunding').textContent = '$' + (totalFundingPerUnit / fetchedData.length).toFixed(2);
            
            // Show summary section
            document.getElementById('summarySection').style.display = 'block';
            
            // Scroll to summary
            document.getElementById('summarySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    </script>
</body>
</html>
