import React from "react"
import ReactECharts from "echarts-for-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

function ChartCard({ title, option, loading, error, children }) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ReactECharts option={option} style={{ height: "400px" }} />}
        {children}
      </CardContent>
    </Card>
  );
}

export default ChartCard
