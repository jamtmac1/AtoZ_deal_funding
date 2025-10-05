<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deal Calculator - Amazon Style</title>
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
            max-width: 900px;
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
        
        .form-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #0F1111;
            font-size: 14px;
        }
        
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #D5D9D9;
            border-radius: 4px;
            font-size: 14px;
        }
        
        input:focus {
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
            width: 100%;
            margin-top: 10px;
        }
        
        button:hover {
            background-color: #FA8900;
        }
        
        .results {
            margin-top: 30px;
            padding: 20px;
            background-color: #F7F8F8;
            border-radius: 8px;
            border-left: 4px solid #FF9900;
        }
        
        .results h2 {
            color: #232F3E;
            margin-bottom: 20px;
            font-size: 20px;
        }
        
        .result-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .result-item {
            background-color: white;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #D5D9D9;
        }
        
        .result-label {
            font-size: 12px;
            color: #565959;
            margin-bottom: 5px;
        }
        
        .result-value {
            font-size: 24px;
            font-weight: 700;
            color: #0F1111;
        }
        
        .result-value.currency::before {
            content: '$';
            font-size: 18px;
            margin-right: 2px;
        }
        
        .alert {
            padding: 12px;
            margin-top: 15px;
            border-radius: 4px;
            font-size: 13px;
        }
        
        .alert-warning {
            background-color: #FFF4E5;
            border-left: 4px solid #F90;
            color: #0F1111;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Deal Intelligence Assistant</h1>
        <p class="subtitle">Calculate deal economics and forecasted performance</p>
        <div class="input-group" style="margin-bottom: 30px;">
            <label>ASIN</label>
            <input type="text" id="asin" placeholder="e.g., B0FLLR96JAA" style="text-transform: uppercase;">
        </div>
        
        <div class="form-section">
            <!-- Pricing Inputs -->
            <div>
                <div class="input-group">
                    <label>Current Site Price ($)</label>
                    <input type="number" id="currentPrice" value="19.99" step="0.01">
                </div>
                
                <div class="input-group">
                    <label>Basis Price ($)</label>
                    <input type="number" id="basisPrice" value="19.99" step="0.01">
                </div>
                
                <div class="input-group">
                    <label>HAMP T30D Price ($)</label>
                    <input type="number" id="hampPrice" value="18.99" step="0.01">
                </div>
            </div>
            
            <!-- Deal & Forecast Inputs -->
            <div>
                <div class="input-group">
                    <label>Discount (%)</label>
                    <input type="number" id="discount" value="30" step="1" min="0" max="100">
                </div>
                
                <div class="input-group">
                    <label>T4W Average Units (Trailing 4 Weeks)</label>
                    <input type="number" id="t4wUnits" value="100" step="1">
                </div>
                
                <div class="input-group">
                    <label>Deal Lift Multiplier (e.g., 3x = 300%)</label>
                    <input type="number" id="dealLift" value="3" step="0.1">
                </div>
                
                <div class="input-group">
                    <label>Deal Duration (days)</label>
                    <input type="number" id="dealDuration" value="2" step="1">
                </div>
            </div>
        </div>
        
        <button onclick="calculateDeal()">Calculate Deal Economics</button>
        
        <div class="results" id="results" style="display:none;">
            <h2>📊 Deal Summary - <spam id="resultAsin" style="color: #565959; font-size: 18px;"></span></h2>
            
            <div class="result-grid">
                <div class="result-item">
                    <div class="result-label">Deal Price</div>
                    <div class="result-value currency" id="dealPrice">0.00</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">Funding Per Unit</div>
                    <div class="result-value currency" id="fundingPerUnit">0.00</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">Forecasted Deal Units</div>
                    <div class="result-value" id="forecastedUnits">0</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">Total Deal Funding</div>
                    <div class="result-value currency" id="totalFunding">0.00</div>
                </div>
            </div>
            
            <div id="alertBox"></div>
        </div>
    </div>

    <script>
        function calculateDeal() {
            // Get all input values
            let currentPrice = parseFloat(document.getElementById('currentPrice').value);
            let basisPrice = parseFloat(document.getElementById('basisPrice').value);
            let hampPrice = parseFloat(document.getElementById('hampPrice').value);
            let discount = parseFloat(document.getElementById('discount').value);
            let t4wUnits = parseFloat(document.getElementById('t4wUnits').value);
            let dealLift = parseFloat(document.getElementById('dealLift').value);
            let dealDuration = parseFloat(document.getElementById('dealDuration').value);
            let asin = document.getElementById('asin').value.toUpperCase().trim();

            // Calculate Deal Price: MIN(Current Price * (1 - Discount%), HAMP Price)
            let discountedPrice = currentPrice * (1 - discount / 100);
            let dealPrice = Math.min(discountedPrice, hampPrice);
            dealPrice = Math.floor(dealPrice * 100) / 100; // Round down to 2 decimals
            
            // Calculate Funding Per Unit: Basis Price - Deal Price
            let fundingPerUnit = basisPrice - dealPrice;
            fundingPerUnit = Math.round(fundingPerUnit * 100) / 100;
            
            // Calculate Forecasted Units
            // T4W gives us weekly average, so: (T4W * Deal Lift * Duration in weeks)
            let weeksInDeal = dealDuration / 7;
            let forecastedUnits = Math.round(t4wUnits * dealLift * weeksInDeal);
            
            // Calculate Total Funding
            let totalFunding = fundingPerUnit * forecastedUnits;
            totalFunding = Math.round(totalFunding * 100) / 100;
            
            // Display results
            document.getElementById('dealPrice').textContent = dealPrice.toFixed(2);
            document.getElementById('fundingPerUnit').textContent = fundingPerUnit.toFixed(2);
            document.getElementById('forecastedUnits').textContent = forecastedUnits.toLocaleString();
            document.getElementById('totalFunding').textContent = totalFunding.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            
            // Display ASIN in results
            document.getElementById('resultAsin').textContent = asin || 'No ASIN';

            // Show results
            document.getElementById('results').style.display = 'block';
            
            // Show warning if funding is negative or very high
            let alertBox = document.getElementById('alertBox');
            if (fundingPerUnit < 0) {
                alertBox.innerHTML = '<div class="alert alert-warning">⚠️ Warning: Negative funding per unit. Deal price exceeds basis price.</div>';
            } else if (fundingPerUnit / basisPrice > 0.5) {
                alertBox.innerHTML = '<div class="alert alert-warning">⚠️ Warning: Funding exceeds 50% of basis price. High-cost deal.</div>';
            } else {
                alertBox.innerHTML = '';
            }
            
            // Scroll to results
            document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    </script>
</body>
</html>
