// src/components/KeyMetrics.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MetricCard = ({ title, value }) => (
  <Card className="shadow-sm">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const KeyMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <MetricCard
        title="Total Revenue"
        value={`$${metrics?.totalRevenue?.toFixed(2) || 0}`}
      />
      <MetricCard
        title="Total Sales"
        value={metrics?.totalSales || 0}
      />
      <MetricCard
        title="Average Sale Value"
        value={`$${metrics?.avageSaleValue?.toFixed(2) || 0}`}
      />
    </div>
  );
};

export default KeyMetrics;
