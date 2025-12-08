import React from 'react';

const ReportViewer = ({ reportUrl }) => {
    if (!reportUrl) return null;

    return (
        <div className="w-full h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full h-full overflow-hidden border border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="font-semibold text-gray-700">Analysis Report</h2>
                    <a
                        href={reportUrl}
                        download
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Open in New Tab
                    </a>
                </div>
                <iframe
                    src={reportUrl}
                    className="w-full h-full border-none"
                    title="Data Analysis Report"
                />
            </div>
        </div>
    );
};

export default ReportViewer;
