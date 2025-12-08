import React from 'react';
import { motion } from 'framer-motion';
import AgentStatus from './AgentStatus';
import { Loader } from 'lucide-react';

const ProcessingView = ({ progress, currentAgent, logs, agentsStatus }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block p-3 bg-blue-100 rounded-full text-blue-600 mb-4"
                >
                    <Loader size={32} />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800">Cleaning Your Data</h2>
                <p className="text-gray-500">Autonomous agents are processing your dataset...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Agent Status Column */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <AgentStatus agentsList={agentsStatus} currentAgent={currentAgent} />
                </div>

                {/* Logs Column */}
                <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-gray-300 h-[400px] overflow-y-auto">
                    <h3 className="text-gray-100 font-semibold mb-3 border-b border-gray-700 pb-2">Pipeline Logs</h3>
                    <div className="space-y-2">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="break-words"
                            >
                                <span className="text-gray-500">[{log.timestamp}]</span>{' '}
                                <span className={log.type === 'error' ? 'text-red-400' : 'text-blue-300'}>
                                    [{log.agent}]
                                </span>{' '}
                                {log.message}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingView;
