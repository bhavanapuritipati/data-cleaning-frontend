import React from 'react';
import { Download, FileBarChart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultsView = ({ jobId, stats, onDownloadCsv, onDownloadReport }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-4"
            >
                <CheckCircle size={48} />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800">Data Cleaning Complete!</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
                Your dataset has been successfully processed. You can now download the cleaned CSV or view the detailed analysis report.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onDownloadCsv}
                    className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                >
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 group-hover:bg-blue-100">
                        <Download size={32} />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">Download Cleaned CSV</span>
                    <span className="text-sm text-gray-500 mt-2">Ready for analysis</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onDownloadReport}
                    className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all group"
                >
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-4 group-hover:bg-purple-100">
                        <FileBarChart size={32} />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">Download Report</span>
                    <span className="text-sm text-gray-500 mt-2">HTML Analysis Dashboard</span>
                </motion.button>
            </div>

            {/* Quick Stats Summary */}
            {stats && (
                <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">Cleaning Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{stats.rows_processed}</div>
                            <div className="text-xs text-gray-500">Rows Processed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{stats.issues_fixed}</div>
                            <div className="text-xs text-gray-500">Issues Fixed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{stats.quality_score}%</div>
                            <div className="text-xs text-gray-500">Quality Score</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsView;
