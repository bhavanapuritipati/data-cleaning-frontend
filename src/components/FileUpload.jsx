import React, { useRef, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({ onFileUpload }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'text/csv') {
            onFileUpload(files[0]);
        } else {
            alert('Please upload a CSV file.');
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto"
        >
            <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                />

                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <UploadCloud size={40} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Upload your Dataset
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Drag & drop your CSV file here, or click to browse
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FileText size={16} />
                        <span>Only CSV files supported</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FileUpload;
