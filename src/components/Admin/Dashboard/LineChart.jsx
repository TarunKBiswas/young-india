/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ revenue }) => {
  const monthlyRevenue = revenue?.reduce((acc, item) => {
    acc[item.month] = item.value;
    return acc;
  }, {});

  const labels = Object.keys(monthlyRevenue);
  const dataValues = Object.values(monthlyRevenue);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: dataValues,
        fill: false,
        borderColor: "#36A2EB",
        border: "100px",
        backgroundColor: "#36A2EB",
        pointBorderColor: "#FFFFFF",
        pointBackgroundColor: "#36A2EB",
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Monthly Revenue Over the Year",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `₹ ${context.raw} `;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
