Here are the API endpoints you can test in Postman:

### 1. Revenue Report
**GET** `/api/analytics/revenue?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### 2. Top Products
**GET** `/api/analytics/top-products?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### 3. Top Customers
**GET** `/api/analytics/top-customers?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### 4. Sales by Region
**GET** `/api/analytics/sales-by-region?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### 5. Sales by Category
**GET** `/api/analytics/sales-by-category?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### 6. Get Saved Report
**GET** `/api/analytics/reports`

### 7. Save a Report
**POST** `http://localhost:5000/api/analytics/reports`
- Body (JSON):
```json
{
  "type": "revenue",
  "params": { "startDate": "2025-01-01", "endDate": "2025-09-01" },
  "data": { /* report data */ }
}
```

Replace the dates and data as needed for your tests.