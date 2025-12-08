import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full text-center space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                    <Sparkles size={16} />
                    <span>Powered by Multi-Agent AI</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
                    Clean Your Data <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Autonomously
                    </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Upload your raw dataset and let our team of AI agents handle schema validation,
                    imputation, outlier detection, and reporting—automatically.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Start Cleaning Now
                        <ArrowRight size={20} />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                        View Demo
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 text-left">
                    <FeatureCard
                        icon={<Database className="text-blue-500" />}
                        title="Smart Validation"
                        description="Automatically detects schema inconsistencies and invalid types."
                    />
                    <FeatureCard
                        icon={<Sparkles className="text-purple-500" />}
                        title="Auto Imputation"
                        description="Intelligently fills missing values using context-aware AI."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-green-500" />}
                        title="Quality Report"
                        description="Get detailed insights and a downloadable clean dataset."
                    />
                </div>
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </div>
);

export default Home;
