import React from 'react';
import { CheckCircle, Circle, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentStatusItem = ({ name, status, index }) => {
    const getIcon = () => {
        switch (status) {
            case 'completed': return <CheckCircle className="text-green-500" />;
            case 'processing': return <Loader2 className="animate-spin text-blue-500" />;
            case 'error': return <AlertCircle className="text-red-500" />;
            default: return <Circle className="text-gray-300" />;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'processing': return 'Processing...';
            case 'error': return 'Failed';
            default: return 'Waiting';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg border ${status === 'processing' ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
                }`}
        >
            <div className="flex items-center gap-3">
                {getIcon()}
                <span className={`font-medium ${status === 'pending' ? 'text-gray-400' : 'text-gray-700'}`}>
                    {name}
                </span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-white text-gray-500 border border-gray-100">
                {getStatusText()}
            </span>
        </motion.div>
    );
};

const AgentStatus = ({ currentAgent, agentsList = [] }) => {
    // Expected agentsList: [{ id: 'schema', name: 'Schema Validator' }, ...]

    // Determine status for each agent based on currentAgent
    // If currentAgent is 'imputer', then 'schema' is completed.

    // For simplicity, let's assume parent passes fully formed status list OR we derive it.
    // Let's assume parent passes `agentStatuses` map: { schema: 'completed', imputer: 'processing' }

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-4">Pipeline Agents</h3>
            {agentsList.map((agent, index) => (
                <AgentStatusItem
                    key={agent.id}
                    name={agent.name}
                    status={agent.status}
                    index={index}
                />
            ))}
        </div>
    );
};

export default AgentStatus;
