# AtoZ_deal_funding
This is an enhancement to Amazon's deal funding forecast calculations.
A web-based application that automates complex deal economics calculations for Amazon retail operations, enabling bulk processing of up to 100 ASINs with real-time forecasting and funding analysis.

Problem Statement
Amazon Customer Success Managers face significant challenges managing tentpole and promotional deals:

Manual Calculations: Deal pricing, funding calculations, and forecasting require manual work across multiple tools (Retail Assistant, QuickSight, Denali, PromOsys)
Time-Intensive Process: Processing each ASIN individually takes 5-10 minutes, making bulk deal analysis impractical
Error-Prone: Complex business logic (basis price comparisons, HAMP constraints, funding calculations) increases risk of manual errors
Limited Scalability: Cannot efficiently evaluate large deal packages or run scenario analysis
Fragmented Data: Requires toggling between multiple internal systems to gather all required metrics

For a typical 50-ASIN deal package, this process could take 4+ hours of manual work.
💡 Solution
The Multi-ASIN Deal Intelligence Assistant automates the entire deal evaluation workflow, processing up to 100 ASINs simultaneously with:

Automated Data Retrieval: Simulates fetching ASIN metrics (current price, basis price, HAMP T30D, trailing 4-week units, CPPU) from backend systems
Bulk Processing: Calculate deal economics for entire product portfolios in seconds
Dynamic Forecasting: Adjustable deal parameters (discount %, lift multiplier, duration) with instant recalculation
Visual Intelligence: Color-coded warnings for underperforming ASINs and aggregate summary metrics
Business Logic Validation: Automatically applies HAMP constraints and basis price rules

Key Features
1. Bulk ASIN Processing
Input up to 100 ASINs via textarea (one per line)
Mock API integration simulates database queries
Handles missing ASINs gracefully with clear warnings

2. Automated Deal Calculations
Implements complex Amazon deal logic:
Deal Price = MIN(Current Price × (1 - Discount%), HAMP T30D)
Funding Per Unit = Basis Price - Deal Price
Forecasted Units = T4W Units × Deal Lift × (Deal Duration / 7)
Total Deal Funding = Funding Per Unit × Forecasted Units

3. Dynamic Deal Parameters
Discount Percentage: Adjustable 0-100%
Deal Lift Multiplier: Expected sales increase (default 3x)
Deal Duration: Event length in days

4. Performance Indicators
Red Warning: ASINs with negative CPPU (cost per purchasing unit)
Green Success: Healthy performing ASINs
Summary Cards: Total ASINs, forecasted units, funding requirements, average funding per unit

5. Responsive Data Table
Sticky headers for large datasets
Sortable columns for analysis
Hover effects for readability
Mobile-responsive design

Technical Architecture
Frontend Stack
HTML5: Semantic structure with accessibility considerations
CSS3: Amazon Ember font family, responsive grid layouts, Amazon brand colors
Vanilla JavaScript: No dependencies, lightweight implementation

Data Layer (Simulated)
javascriptconst mockDatabase = {
    'B0FLLR96JAA': {
        itemName: 'VIPES FOR HOME - Kitchen Wipes',
        currentPrice: 19.99,
        basisPrice: 19.99,
        hampT30D: 18.99,
        t4wUnits: 143,
        t4wCPPU: -2.12
    },
    // Additional ASINs...
};
In production, this would integrate with:

DynamoDB: ASIN metadata storage
API Gateway: RESTful endpoints for data retrieval
Lambda Functions: Serverless calculation processing

Key Functions
fetchAsinData()

Parses ASIN input (max 100)
Simulates API call with 1.5s delay
Validates against mock database
Populates results table with fetched data

calculateAllDeals()

Applies configurable deal parameters
Implements Amazon deal pricing logic
Calculates forecasts using lift multipliers
Updates summary metrics and table

Design Patterns -

Separation of Concerns: Data layer separated from presentation
Progressive Enhancement: Core functionality works without JavaScript
Error Handling: Graceful degradation for missing ASINs
User Feedback: Loading states and success notifications

Business Impact -
Time Savings
Before: 4+ hours for 50-ASIN deal analysis
After: < 2 minutes for 100-ASIN analysis
Efficiency Gain: 99%+ reduction in manual calculation time

Accuracy Improvements

Eliminates manual calculation errors
Consistent application of business rules
Real-time validation against HAMP constraints

Strategic Value

Enables rapid scenario analysis (what-if modeling)
Supports data-driven deal negotiations
Scales to handle Prime Day volume (1000+ ASINs)

Cost Avoidance

Preventing a single funding miscalculation on a high-volume ASIN (10,000+ units) could save:
$1 funding error × 10,000 units = $10,000 avoided loss

How It Works
Workflow
1. User Input
   └─> Enter ASINs (one per line)
   
2. Data Retrieval
   └─> Click "Fetch ASIN Data"
   └─> Simulated API call to mock database
   └─> Display fetched metrics in table
   
3. Configure Deal Parameters
   └─> Set discount percentage
   └─> Adjust deal lift multiplier
   └─> Define deal duration
   
4. Calculate Economics
   └─> Click "Calculate Deal Economics"
   └─> Apply pricing logic to all ASINs
   └─> Generate forecasts and funding
   
5. Analyze Results
   └─> Review summary cards (totals, averages)
   └─> Identify problem ASINs (red warnings)
   └─> Export for vendor negotiations

Sample Calculation
Input ASIN: B0FLLR96JAA
Parameters: 25% discount, 3x lift, 2-day deal
Current Price:     $19.99
Basis Price:       $19.99
HAMP T30D:         $18.99
T4W Units:         143

Deal Price:        MIN($19.99 × 0.75, $18.99) = $14.99
Funding/Unit:      $19.99 - $14.99 = $5.00
Forecast:          143 × 3 × (2/7) = 122 units
Total Funding:     $5.00 × 122 = $610.00

Usage
Getting Started

Clone or download the HTML file
Open in browser (Chrome, Firefox, Safari, Edge)
No installation or dependencies required

Quick Start
html<!-- Open index.html in any modern browser -->
Sample ASINs (Mock Database)
B0FLLR96JAA    - VIPES FOR HOME - Kitchen Wipes
B001ABC1234    - Premium Paper Towels 12-Pack
B002DEF5678    - Eco-Friendly Cleaning Spray
B003GHI9012    - Multi-Surface Disinfectant
B004JKL3456    - Microfiber Cleaning Cloths 24pk
B005MNO7890    - Glass Cleaner Refill 64oz
Running Calculations

Paste ASINs into textarea (one per line)
Click "Fetch ASIN Data" to retrieve metrics
Adjust deal parameters as needed
Click "Calculate Deal Economics" for results
Review summary cards and detailed table

🔮 Future Enhancements
Phase 2: AWS Integration

 DynamoDB Integration: Replace mock database with real ASIN data
 Lambda Functions: Backend calculation processing
 API Gateway: RESTful endpoints for data operations
 S3 Storage: Export results to CSV/Excel
 AI: Leverage Quick Suite or Nova for prompting ease

Phase 3: Advanced Features

 Historical Analysis: Compare deal performance vs. forecasts
 Vendor Funding Splits: Calculate co-op funding scenarios
 Deal Approval Workflow: Integration with approval systems
 Export Functionality: Download results for presentations
 Authentication: SSO integration for internal users

Phase 4: Intelligence Layer

 ML-Powered Forecasting: Improve lift predictions using historical data
 Anomaly Detection: Flag unusual pricing or CPPU patterns
 Recommendation Engine: Suggest optimal discount levels
 Competitive Analysis: Compare deal pricing vs. marketplace

Technical Improvements

 React/Vue Migration: Component-based architecture
 TypeScript: Type safety for complex calculations
 Unit Testing: Jest/Mocha test coverage
 CI/CD Pipeline: Automated deployment
 Monitoring: CloudWatch integration for API performance

Technical Skills Demonstrated

Frontend Development: HTML5, CSS3, JavaScript ES6+
UI/UX Design: Amazon design system, responsive layouts
Business Logic: Complex pricing algorithms and forecasting
Data Modeling: Structured ASIN metadata design
API Design: RESTful patterns (simulated)
Cloud Architecture: DynamoDB, Lambda, API Gateway concepts
Product Thinking: Identified pain point and built solution
Domain Expertise: Deep understanding of Amazon retail operations

License
This is a portfolio project demonstrating technical capabilities for educational purposes.

Author
Built to showcase full-stack development skills and domain expertise in e-commerce operations, with a focus on automation and scalability.

Note: This application uses mock data for demonstration purposes. In a production environment, it would integrate with actual Amazon internal APIs and databases with appropriate authentication and authorization controls.
