'use client';
import MenuBar from "../../component/MenuBar.jsx";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";

const DashboardPage = () => {
  const [data, setData] = useState([]);

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

  return (
    <>
      <MenuBar />
      <div className="p-6">
        <h1 className="text-3xl text-center font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg text-center text-black font-semibold mb-3">Total Saturation:</h2>
            <div className="flex justify-center items-center mb-3">
              <p className="text-gray-700 text-center mr-2">Updated Data</p>
              <button
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Refresh Data"
                onClick={() => window.location.reload()}
              >
                &#x21bb;
              </button>
            </div>
            <Link href='/dashboard/saturation'>
              <div>
                <VictoryChart
                  height={200}
                  width={700}
                  domainPadding={20}
                  padding={{ top: 50, bottom: 50, left: 80, right: 50 }}
                >
                  <VictoryAxis
                    tickValues={data.map((d) => d.name)}
                    tickFormat={(tick) => tick}
                  />
                  <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
                  <VictoryBar
                    data={data}
                    x="name"
                    y="saturation"
                    style={{ data: { fill: "rgba(54, 162, 235, 0.6)" } }}
                    labels={({ datum }) => `${datum.saturation}%`}
                    labelComponent={<VictoryLabel dy={-10} />}
                  />
                </VictoryChart>
              </div>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <Link href="/dashboard/dbt">
              <h2 className="text-lg text-center text-black font-semibold mb-2">Total DBT Scheme:</h2>
              <div className="flex justify-between pt-12">
                <div className="flex-1 text-center bg-green-500 rounded-lg p-4">
                  <p className="text-gray-700 p-4">Implemented</p>
                  <p className="text-gray-700 p-4 text-lg">25</p>
                </div>
                <div className="flex-1 text-center bg-yellow-500 rounded-lg p-4 ml-4">
                  <p className="text-gray-700 p-4">In Progress</p>
                  <p className="text-gray-700 p-4 text-lg">5</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <Link href="/dashboard/crm">
              <h2 className="text-lg text-center text-black font-semibold mb-2">Total CRM Cases:</h2>
              <div className="flex justify-between pt-12">
                <div className="flex-1 text-center bg-red-500 rounded-lg p-4">
                  <p className="text-gray-700 p-4">Case Closed</p>
                  <p className="text-gray-700 p-4 text-lg">100</p>
                </div>
                <div className="flex-1 text-center bg-green-500 rounded-lg p-4 ml-4">
                  <p className="text-gray-700 p-4">Case Pending</p>
                  <p className="text-gray-700 p-4 text-lg">12</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg text-center text-black font-semibold mb-2">More Data:</h2>
            <p className="text-gray-700 p-8">More</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
