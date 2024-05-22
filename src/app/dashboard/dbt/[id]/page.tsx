// pages/dashboard/dbt/[id].jsx
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import MenuBar from '../../../../component/MenuBar';

const DBTDetailPage = ({ params }) => {
    const [scheme, setScheme] = useState(null);
    const { id } = params;
    const router = useRouter();

    useEffect(() => {
        fetch('/dbtdata.json')
            .then(response => response.json())
            .then(data => {
                const selectedScheme = data.find(item => item.id === parseInt(id));
                setScheme(selectedScheme);
            });
    }, [id]);

    if (!scheme) {
        return <div>Loading...</div>;
    }

    const handleUpdate = () => {
        // Implement update logic here
        console.log('Updating scheme:', scheme);
        // Navigate back to the list page after update
        router.push('/dashboard/dbt');
    };

    const handleArchive = () => {
        // Implement archive logic here
        console.log('Archiving scheme:', scheme);
        // Navigate back to the list page after archive
        router.push('/dashboard/dbt');
    };

    return (
        <>
            <MenuBar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">DBT Scheme Details</h1>
                <div className="bg-white text-black shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="mb-4">
                                    <strong>Sl. No.:</strong> {scheme.id}
                                </div>
                                <div className="mb-4">
                                    <strong>Scheme:</strong> {scheme.scheme}
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <strong>Status:</strong>{' '}
                                    <span
                                        className={`inline-block px-2 py-1 rounded-lg ${scheme.status === 'Implemented'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-yellow-500 text-white'
                                            }`}
                                    >
                                        {scheme.status}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <strong>State:</strong> {scheme.state}
                                </div>
                                <div className="mb-4">
                                    <strong>Scheme under:</strong> {scheme.schemeUnder} {/* Replace with actual director name */}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <strong>Uploaded by:</strong> {scheme.uploadedBy}
                        </div>
                        <div className="mb-4">
                            <strong>Project details:</strong> {scheme.projectDetails}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => router.push('/dashboard/dbt')}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleArchive}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DBTDetailPage;
