import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";


const socket = io("https://anlytics-app.onrender.com"); // Adjust URL as needed

const ReportsHistory = ({ onViewReport }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analytics/reports');
      if (Array.isArray(res.data)) {
        setReports(res.data);
      } else if (res.data && typeof res.data === 'object') {
        setReports([res.data]);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    socket.on('newReport', (newReport) => {
      setReports((prevReports) => [newReport, ...prevReports]);
    });
    return () => {
      socket.off('newReport');
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reports History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, idx) => (
              <TableRow key={report._id || idx}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.params?.startDate}</TableCell>
                <TableCell>{report.params?.endDate}</TableCell>
                <TableCell>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : "—"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewReport(report)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ReportsHistory;
