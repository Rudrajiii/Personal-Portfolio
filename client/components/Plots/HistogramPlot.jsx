import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const getShortForm = (language) => {
  const shortForms = {
    Python: 'py',
    JavaScript: 'js',
    Java: 'java',
    Cpp: 'cpp',
    C: 'c',
    Go: 'go',
    Ruby: 'rb',
    PHP: 'php',
    TypeScript: 'ts',
    Rust: 'rs',
    Swift: 'swift',
    Kotlin: 'kt',
    Scala: 'scala',
    Haskell: 'hs',
    Erlang: 'erl',
    Lua: 'lua',
    R: 'r',
    Julia: 'jl',
    Dart: 'dart',
    Perl: 'pl',
    Shell: 'sh',
    SQL: 'sql',
    HTML: 'html',
    CSS: 'css',
    SCSS: 'scss',
    JSON: 'json',
    Markdown: 'md',
    Text: 'txt',
    PowerShell: 'ps',
    Bash: 'bash',
    Other: 'oth',
    "Git Config": 'git',
  };

  return shortForms[language] || language.substring(0, 2); // Default to first two letters if not found
};

// Histogram Chart Component
const HistogramChart = ({ apiData }) => {
  // Process the API data to prepare it for the chart
  const processData = () => {
    // Check if we have valid data
    if (!apiData || !apiData.data || !Array.isArray(apiData.data) || apiData.data.length === 0) {
      return [];
    }

    // Format the data for recharts
    const formattedData = apiData.data.map(lang => ({
      name: lang.name,
      value: parseFloat(lang.percent.toFixed(2)), // Use percent as value
      text: `${lang.percent.toFixed(1)}%`,        // Format percentage for display
      color: lang.color                           // Use the color provided by API
    }));

    // Sort by percentage in descending order
    formattedData.sort((a, b) => b.value - a.value);

    // Apply the centering distribution logic
    return createHistogramDistribution(formattedData);
  };

  // Create histogram distribution with highest value in center
  const createHistogramDistribution = (sortedData) => {
    if (!sortedData || sortedData.length === 0) return [];

    const totalItems = sortedData.length;
    const result = new Array(totalItems);
    const centerIndex = Math.floor(totalItems / 2);

    // Place the highest value language in the center
    result[centerIndex] = sortedData[0];

    // Alternate placement: left and right of center for remaining languages
    let leftIndex = centerIndex - 1;
    let rightIndex = centerIndex + 1;
    let dataIndex = 1;

    while (dataIndex < totalItems) {
      // Place on the right if available
      if (rightIndex < totalItems && dataIndex < totalItems) {
        result[rightIndex] = sortedData[dataIndex];
        rightIndex++;
        dataIndex++;
      }
      
      // Place on the left if available
      if (leftIndex >= 0 && dataIndex < totalItems) {
        result[leftIndex] = sortedData[dataIndex];
        leftIndex--;
        dataIndex++;
      }
    }

    // Add position index for X-axis ordering
    return result.map((item, index) => ({
      ...item,
      position: index,
      displayName: getShortForm(item.name)
    }));
  };

  // Process the data
  const chartData = processData();

  // If no data, show a loading or empty state
  if (!chartData || chartData.length === 0) {
    return (
      <div style={{ 
        width: "100%", 
        height: "180px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        color: "#B3B5B9"
      }}>
        Loading coding statistics...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, bottom: 8, left: 0 }}
        >
          {/* X-Axis */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'whitesmoke' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Languages Used in past 7 days",
              position: "insideBottom",
              offset: -5,
              style: { textAnchor: 'middle', fill: '#B3B5B9', fontSize: '12px' }
            }}
            tickFormatter={(name) => getShortForm(name)}
          />

          {/* Y-Axis */}
          <YAxis
            tick={{ fontSize: 11, fill: 'whitesmoke' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Percentage Used",
              angle: -90,
              offset: 22,
              position: "insideLeft",
              style: { textAnchor: 'middle', fill: '#B3B5B9', fontSize: '12px' }
            }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name, props) => {
              const entry = props.payload;
              return [`${entry.text}`, `Usage Percentage`];
            }}
            contentStyle={{
              backgroundColor: '#282828',
              border: '1px solid #464646',
              borderRadius: '8px',
              color: '#B3B5B9',
              fontSize: '12px'
            }}
            cursor={{ fill: 'rgba(139, 195, 74, 0.1)' }}
          />


          <Bar
            dataKey="value"
            name="Usage Percentage"
            radius={[2, 2, 0, 0]}
            fill="#8bc34a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;