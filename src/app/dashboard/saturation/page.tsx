'use client';
import MenuBar from "../../../component/MenuBar";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const SaturationPage = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState('saturation');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/saturation.json');
        const jsonData = await response.json();
        setData(jsonData.states);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleOptionChange = (newOption) => {
    setOption(newOption);
  };

  const getDatasets = () => {
    const commonSettings = {
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };

    switch (option) {
      case 'all':
        return [
          {
            label: 'Total Enrollment',
            data: data.map(state => state.totalEnrollment),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Population',
            data: data.map(state => state.totalPopulation),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Saturation',
            data: data.map(state => state.saturation),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ];
      default:
        return [
          {
            label: option,
            data: data.map(state => state[option]),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ];
    }
  };

  const chartData = {
    labels: data.map(state => state.name),
    datasets: getDatasets()
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value.toLocaleString(),
        font: {
          weight: 'bold'
        }
      }
    }
  };

  return (
    <>
      <MenuBar />
      <div style={{ padding: '20px' }}>
        
        <div style={{ marginBottom: '20px', marginLeft: '90px', display: 'flex', gap: '10px' }}>
          <Button variant="contained" onClick={() => handleOptionChange('totalEnrollment')}>Total Enrollment</Button>
          <Button variant="contained" onClick={() => handleOptionChange('totalPopulation')}>Total Population</Button>
          <Button variant="contained" onClick={() => handleOptionChange('saturation')}>Saturation</Button>
          <Button variant="contained" onClick={() => handleOptionChange('all')}>All</Button>
        </div>
        <div style={{ height: '500px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default SaturationPage;
