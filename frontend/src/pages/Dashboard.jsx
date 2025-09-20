import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DateRangePicker } from "@/components/DateRangePicker";
import api from "../services/api";
import ChartCard from "@/components/ChartCard";
import KeyMetrics from "@/components/KeyMatrics";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [chartsData, setChartsData] = useState({
    revenue: null,
    products: null,
    customers: null,
    region: null,
    category: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Redirect if no token
  useEffect(() => {
    if (!Cookies.get("jwt_token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Fetch all charts data when dates change
  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return; // wait until both dates are selected
      setLoading(true);
      setError("");

      try {
        const [revenueRes, productsRes, customersRes, regionRes, categoryRes] =
          await Promise.all([
            api.get(
              `/analytics/revenue?startDate=${
                startDate.toISOString().split("T")[0]
              }&endDate=${endDate.toISOString().split("T")[0]}`
            ),
            api.get(
              `/analytics/top-products?startDate=${
                startDate.toISOString().split("T")[0]
              }&endDate=${endDate.toISOString().split("T")[0]}`
            ),
            api.get(
              `/analytics/top-customers?startDate=${
                startDate.toISOString().split("T")[0]
              }&endDate=${endDate.toISOString().split("T")[0]}`
            ),
            api.get(
              `/analytics/sales-by-region?startDate=${
                startDate.toISOString().split("T")[0]
              }&endDate=${endDate.toISOString().split("T")[0]}`
            ),
            api.get(
              `/analytics/sales-by-category?startDate=${
                startDate.toISOString().split("T")[0]
              }&endDate=${endDate.toISOString().split("T")[0]}`
            ),
          ]);

        setChartsData({
          revenue: revenueRes.data,
          products: productsRes.data,
          customers: customersRes.data,
          region: regionRes.data,
          category: categoryRes.data,
        });
        console.log({
          revenueRes,
          productsRes,
          customersRes,
          regionRes,
          categoryRes,
        });
      } catch {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  // const handleLogout = () => {
  //   Cookies.remove("jwt_token");
  //   navigate("/login", { replace: true });
  // };

  // Chart configs
  const revenueOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: ["Total Revenue", "Total Sales", "Average Sale Value"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [
          chartsData.revenue?.totalRevenue || 0,
          chartsData.revenue?.totalSales || 0,
          chartsData.revenue?.avageSaleValue || 0,
        ],
        type: "bar",
        itemStyle: { color: "#1fb866" },
      },
    ],
  };

  // Map products data to expected format
  const productsOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: chartsData.products?.map((p) => p.productName),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: chartsData.products?.map((p) => p.totalRevenue) || [],
        type: "bar",
        itemStyle: { color: "#2196f3" },
      },
    ],
  };

  // Map customers data to expected format
  const customersOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: { type: "category", data: chartsData.customers?.map((c) => c.name) },
    yAxis: { type: "value" },
    series: [
      {
        data: chartsData.customers?.map((c) => c.totalSpent) || [],
        type: "bar",
        itemStyle: { color: "#ff9800" },
      },
    ],
  };

  // Map region data to expected format
  const regionOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: { type: "category", data: chartsData.region?.map((r) => r.region) },
    yAxis: { type: "value" },
    series: [
      {
        data: chartsData.region?.map((r) => r.totalRevenue) || [],
        type: "bar",
        itemStyle: { color: "#9c27b0" },
      },
    ],
  };

  // Map category data to expected format
  const categoryOptions = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Sales by Category",
        type: "pie",
        radius: [30, 150],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data:
          chartsData.category?.map((cat) => ({
            value: cat.totalRevenue,
            name: cat.category,
          })) || [],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <KeyMetrics metrics={ chartsData.revenue || {}} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <ChartCard
              title="Revenue Report"
              option={revenueOptions}
              loading={loading}
              error={error}
            />
          </div>

          <ChartCard
            title="Top Products"
            option={productsOptions}
            loading={loading}
            error={error}
          />
          <ChartCard
            title="Top Customers"
            option={customersOptions}
            loading={loading}
            error={error}
          />
          <ChartCard
            title="Sales by Region"
            option={regionOptions}
            loading={loading}
            error={error}
          />
          <ChartCard
            title="Sales by Category"
            option={categoryOptions}
            loading={loading}
            error={error}
            />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
