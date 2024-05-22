// pages/dashboard/dbt/add.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import from next/router
import MenuBar from '../../../../component/MenuBar';

const AddDBTPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        scheme: '',
        state: '',
        createdAt: '',
        uploadedBy: 'Nirmallya Dey',
        status: '',
        schemeUnder: '',
        projectDetails: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch existing data from JSON file
            const response = await fetch('/dbtdata.json');
            const existingData = await response.json();

            // Create new scheme object with form data
            const newScheme = {
                id: existingData.length + 1,
                // Generate new ID (assuming IDs are sequential integers)
                ...formData
            };
            console.log(newScheme.id);

            // Update existing data with new scheme
            const newData = [...existingData, newScheme];

            // Update JSON file with new data
            const updateResponse = await fetch('/dbtdata.json', {
                method: 'POST', // Use PUT method for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update data.');
            }

            // Navigate back to the list page after successful update
            router.push('/dashboard/dbt');
        } catch (error) {
            console.error('Error adding DBT scheme:', error);
            // Handle error
        }
    };

    return (
        <>
            <MenuBar />
            <div className="p-6 text-black">
                <h1 className="text-3xl font-bold mb-4">Add DBT Scheme</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="scheme" className="block text-sm font-medium text-gray-700">Scheme:</label>
                                <input
                                    type="text"
                                    id="scheme"
                                    name="scheme"
                                    value={formData.scheme}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select State</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Sikkim">Sikkim</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Created At:</label>
                                <input
                                    type="date"
                                    id="createdAt"
                                    name="createdAt"
                                    value={formData.createdAt}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="uploadedBy" className="block text-sm font-medium text-gray-700">Uploaded By:</label>
                                <input
                                    type="text"
                                    id="uploadedBy"
                                    name="uploadedBy"
                                    value={formData.uploadedBy}
                                    onChange={handleChange}
                                    readOnly
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Status</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Implemented">Implemented</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="schemeUnder" className="block text-sm font-medium text-gray-700">Scheme Under:</label>
                                <select
                                    id="schemeUnder"
                                    name="schemeUnder"
                                    value={formData.schemeUnder}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Scheme Under</option>
                                    <option value="Director 1">Director 1</option>
                                    <option value="Director 2">Director 2</option>
                                    <option value="Director 3">Director 3</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700">Project Details:</label>
                            <textarea
                                id="projectDetails"
                                name="projectDetails"
                                value={formData.projectDetails}
                                onChange={handleChange}
                                rows={6}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Submit and cancel buttons */}
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add DBT Data
                            </button>
                            <button
                                onClick={() => router.push('/dashboard/dbt')}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddDBTPage;
