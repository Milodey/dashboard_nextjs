'use client';
import MenuBar from "../../component/MenuBar.jsx";
import Link from 'next/link';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";

const data = [
  { state: "Assam", saturation: 80 },
  { state: "Arunachal Pradesh", saturation: 85 },
  { state: "Manipur", saturation: 90 },
  { state: "Meghalaya", saturation: 82 },
  { state: "Mizoram", saturation: 88 },
  { state: "Nagaland", saturation: 75 },
  { state: "Tripura", saturation: 79 },
  { state: "Sikkim", saturation: 81 },
];

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Saturation Percentage (%)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'States'
      }
    }
  }
};

export default function DashboardPage() {
  return (
    <>
      <MenuBar />
      <div className="p-6   ">
        <h1 className="text-3xl text-center font-bold mb-6">Dashboard</h1>

        <div className="grid  grid-cols-2 gap-6">

          <div className="  bg-gray-100   p-4 rounded-lg shadow-md">

            <h2 className=" text-lg text-center text-black  font-semibold mb-3">Total Saturation:</h2>
            <div className="flex justify-center items-center">
              <p className="text-gray-700 text-center mr-2">Updated Data</p>
              <button
                className="bg-blue-500 text-white p-0 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                // onClick={handleRefresh}
                aria-label="Refresh Data"
              >
                &#x21bb;
              </button>
            </div>
            <Link href='/dashboard/saturation'>

              <div className="">
                <VictoryChart
                  height={200} // Adjust chart height as needed
                  width={700}  // Adjust chart width as needed
                  domainPadding={20}
                  padding={{ top: 50, bottom: 50, left: 80, right: 50 }} // Adjust padding for better label spacing
                >
                  <VictoryAxis
                    tickValues={data.map((d) => d.state)}
                    tickFormat={(tick) => tick}
                  />
                  <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
                  <VictoryBar
                    data={data}
                    x="state"
                    y="saturation"
                    style={{ data: { fill: "rgba(54, 162, 235, 0.6)" } }}
                    labels={({ datum }) => `${datum.saturation}%`} // Display percentage on each bar
                    labelComponent={<VictoryLabel dy={-10} />} // Adjust label position

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
                  <p className="text-gray-700 p-4 text-lg">5 </p>
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
}
