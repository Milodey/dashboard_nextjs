'use client';

import { useEffect, useState } from 'react';
import MenuBar from '../../../../component/MenuBar';

import { useDisclosure } from '@nextui-org/react';

interface CaseItem {
    slNo: number;
    qrnNo: string;
    grievanceChannel: string;
    natureOfGrievance: string;
    status: string;
    date: string;
}

const CasePage = () => {
    const [cases, setCases] = useState<CaseItem[]>([]);
    const [sortOrder, setSortOrder] = useState({ field: '', order: 'asc' });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

    useEffect(() => {
        fetch('/cases.json')
            .then(response => response.json())
            .then(data => setCases(data))
            .catch(error => console.error('Error fetching case data:', error));
    }, []);

    const handleSort = (field: keyof CaseItem) => {
        const sortedCases = [...cases].sort((a, b) => {
            const aField = a[field] || '';
            const bField = b[field] || '';

            if (sortOrder.order === 'asc') {
                return aField.localeCompare(bField);
            } else {
                return bField.localeCompare(aField);
            }
        });
        setCases(sortedCases);
        setSortOrder({ field, order: sortOrder.order === 'asc' ? 'desc' : 'asc' });
    };

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'resolved':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-red-100 text-red-700';
            default:
                return '';
        }
    };

    const handleQrNoClick = (caseItem: CaseItem) => {
        setSelectedCase(caseItem);
        onOpen(); // Trigger modal open
    };

    return (
        <>
            <MenuBar />
            <div className="p-4 text-black">
                <h1 className="text-2xl text-white font-bold mb-6">Cases</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">SL.No</th>
                                <th className="py-2 px-4 border-b">QRN No.</th>
                                <th
                                    className="py-2 px-4 border-b cursor-pointer"
                                    onClick={() => handleSort('grievanceChannel')}
                                >
                                    Grievance Channel
                                    <span className="ml-2">
                                        {sortOrder.field === 'grievanceChannel' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                                    </span>
                                </th>
                                <th
                                    className="py-2 px-4 border-b cursor-pointer"
                                    onClick={() => handleSort('natureOfGrievance')}
                                >
                                    Nature of Grievance
                                    <span className="ml-2">
                                        {sortOrder.field === 'natureOfGrievance' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                                    </span>
                                </th>
                                <th
                                    className="py-2 px-4 border-b cursor-pointer"
                                    onClick={() => handleSort('status')}
                                >
                                    Status
                                    <span className="ml-2">
                                        {sortOrder.field === 'status' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                                    </span>
                                </th>
                                <th className="py-2 px-4 border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((caseItem) => (
                                <tr key={caseItem.slNo} className={getStatusClass(caseItem.status)}>
                                    <td className="py-2 px-4 border-b text-center">{caseItem.slNo}</td>
                                    <td
                                        className="py-2 px-4 border-b text-center text-blue-500 cursor-pointer"
                                        onClick={() => handleQrNoClick(caseItem)}
                                    >
                                        {caseItem.qrnNo}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{caseItem.grievanceChannel}</td>
                                    <td className="py-2 px-4 border-b text-center">{caseItem.natureOfGrievance}</td>
                                    <td className="py-2 px-4 border-b text-center">{caseItem.status}</td>
                                    <td className="py-2 px-4 border-b text-center">{caseItem.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default CasePage;
