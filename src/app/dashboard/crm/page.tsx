import Link from 'next/link';
import MenuBar from '../../../component/MenuBar';

const CRMPage = () => {
  const data = {
    totalCases: 105,
    resolvedCases: 100,
    pendingCases: 20
  };
  const links = {
    totalCases: '/dashboard/crm/cases',
    resolvedCases: '/dashboard/crm/cases',
    pendingCases: '/dashboard/crm/cases',
    more: '/dashboard/crm/cases'
  }

  return (
    <>
      <MenuBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">CRM</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link href={links.totalCases}>
            <div className="bg-yellow-300 p-12 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Total Cases</h2>
              <p className="text-lg">{data.totalCases}</p>
            </div>
          </Link>
          <Link href={links.resolvedCases}>
            <div className="bg-green-600 p-12 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Resolved Cases</h2>
              <p className="text-lg">{data.resolvedCases}</p>
            </div>
          </Link>
          <Link href={links.pendingCases}>
            <div className="bg-red-600 p-12 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">Pending Cases</h2>
              <p className="text-lg">{data.pendingCases}</p>
            </div>
          </Link>
          <Link href={links.more}>
            <div className="bg-gray-300 p-12 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-2">More</h2>
              <p className="text-lg">View More</p>
            </div>
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/dashboard/crm/cases">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Go To List &rarr;
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CRMPage;
