import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DateRangePicker } from "@/components/DateRangePicker";
import api from "../services/api";
import ChartCard from "@/components/ChartCard";

const Dashboard = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(
          `analytics/revenue?startDate=${
            startDate.toISOString().split("T")[0]
          }&endDate=${endDate.toISOString().split("T")[0]}`
        );
        setData(res.data);
      } catch{
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const chartOptions = {
    xAxis: { type: "category", data: ["Revenue"] },
    yAxis: { type: "value" },
    series: [
      {
        data: [data?.totalRevenue || 0],
        type: "bar",
        itemStyle: { color: "#1fb866" },
      },
    ],
  };
  useEffect(() => {
    // Redirect if no token
    if (!Cookies.get("jwt_token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <>
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Button variant="default" onClick={handleLogout}>
          Logout
        </Button>
        <ModeToggle />
      </div>
    </div>
     <div className="p-6 space-y-6">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <ChartCard
        title="Revenue Report"
        option={chartOptions}
        loading={loading}
        error={error}
      />
    </div>
    </>
  );
};

export default Dashboard;
