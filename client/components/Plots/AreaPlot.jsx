import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Helper to format date like "Jun 1"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

function formatDecimalHours(decimal) {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal % 1) * 60);

  return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
}

const AreaPlot = ({ apiData }) => {
  // Check if we have data and handle the new nested structure
  const hasData = apiData && (apiData.data || Array.isArray(apiData));
  
  // Format data for Recharts based on the structure
  const chartData = React.useMemo(() => {
    if (!hasData) return [];
    
    // Handle both the old and new data structure
    const dataArray = Array.isArray(apiData) ? apiData : apiData.data || [];
    
    return dataArray.map((item) => {
      // Handle the new data structure
      if (item.range && item.grand_total) {
        return {
          name: formatDate(item.range.date),
          uv: parseFloat(item.grand_total.decimal),
          text: item.grand_total.text,
          fullDate: item.range.date
        };
      } 
      // Handle the old data structure
      else if (item.date && item.totalHours !== undefined) {
        return {
          name: formatDate(item.date),
          uv: parseFloat(item.totalHours.toFixed(2)),
          fullDate: item.date
        };
      }
      // Default case (shouldn't happen with valid data)
      return { name: "", uv: 0 };
    }).sort((a, b) => {
      // Sort by date ascending
      return new Date(a.fullDate) - new Date(b.fullDate);
    });
  }, [apiData, hasData]);

  // If no data, show a loading or empty state
  if (!hasData || chartData.length === 0) {
    return (
      <div style={{ 
        width: "100%", 
        height: "180px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        color: "#B3B5B9"
      }}>
        Loading coding activity data...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "180px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 8,
          }}
        >
          {/* Background Grid */}
          {/* <CartesianGrid stroke="#464646" strokeDasharray="3 3" vertical={false} /> */}

          {/* X Axis */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "whitesmoke" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Daily coding activity",
              position: "insideBottom",
              offset: -5,
              style: { textAnchor: "middle", fill: "#B3B5B9", fontSize: "12px" },
            }}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 11, fill: "whitesmoke" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Hours Spent",
              angle: -90,
              offset: 22,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#B3B5B9", fontSize: "12px" },
            }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name, props) => {
              // Use the text property if available, otherwise format the decimal
              const item = props.payload[0]?.payload;
              if (item && item.text) {
                return [item.text, "Coding Time"];
              }
              return [`${formatDecimalHours(value)}`, "Time Spent"];
            }}
            contentStyle={{
              backgroundColor: "#282828",
              border: "1px solid #464646",
              borderRadius: "8px",
              color: "#B3B5B9",
              fontSize: "12px",
            }}
            cursor={{ fill: "rgba(139, 195, 74, 0.1)" }}
          />

          {/* Area Curve */}
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8bc34a"
            fill="url(#colorUv)"
            strokeWidth={2}
            activeDot={{
              r: 5,
              fill: "#8bc34a",
              stroke: "#fff",
              strokeWidth: 1,
            }}
          />

          {/* Gradient Fill */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8bc34a" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8bc34a" stopOpacity={0.05} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaPlot;