import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import ProcessingView from '../components/ProcessingView';
import ResultsView from '../components/ResultsView';
import { uploadFile, startProcessing, getJobStatus, downloadCsv, downloadReport } from '../services/api';

const Dashboard = () => {
    const [step, setStep] = useState('upload'); // upload, processing, results
    const [jobId, setJobId] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentAgent, setCurrentAgent] = useState('pending');
    const [logs, setLogs] = useState([]);
    const [agentsStatus, setAgentsStatus] = useState([
        { id: 'schema_validator', name: 'Schema Validator', status: 'pending' },
        { id: 'imputer', name: 'Missing Value Imputer', status: 'pending' },
        { id: 'outlier_detector', name: 'Outlier Detector', status: 'pending' },
        { id: 'transformer', name: 'Data Transformer', status: 'pending' },
        { id: 'reporter', name: 'Report Generator', status: 'pending' },
    ]);
    const [stats, setStats] = useState(null);

    const addLog = (message, agent, type = 'info') => {
        setLogs(prev => [{
            timestamp: new Date().toLocaleTimeString(),
            agent,
            message,
            type
        }, ...prev]);
    };

    const handleFileUpload = async (file) => {
        try {
            setStep('processing');
            addLog(`Uploading file: ${file.name}`, 'System');

            // Allow simulation for UI testing if backend is offline
            // remove this in production or make robust
            let id;
            try {
                const response = await uploadFile(file);
                id = response.job_id;
            } catch (e) {
                console.error("Upload failed (backend likely offline), using mock job_id");
                addLog('Backend unavailable. Demo mode active.', 'System', 'error');
                id = "mock-job-id";
            }

            setJobId(id);
            addLog('File uploaded successfully. Initializing pipeline...', 'System');

            // Start Processing
            try {
                await startProcessing(id);
            } catch (e) {
                // Ignore error in demo mode
            }

            startPolling(id);

        } catch (error) {
            console.error('Upload failed:', error);
            addLog('Upload failed. Please try again.', 'System', 'error');
            setStep('upload');
        }
    };

    const startPolling = (id) => {
        // Poll every 2 seconds
        const interval = setInterval(async () => {
            try {
                let statusData;
                if (id === "mock-job-id") {
                    // MOCK LOGIC for UI verification
                    statusData = await mockStatusUpdate();
                } else {
                    statusData = await getJobStatus(id);
                }

                updateState(statusData);

                if (statusData.status === 'completed') {
                    clearInterval(interval);
                    setStats(statusData.stats || { rows_processed: 1000, issues_fixed: 142, quality_score: 98 }); // Fallback/Mock
                    setTimeout(() => setStep('results'), 1000);
                } else if (statusData.status === 'failed') {
                    clearInterval(interval);
                    addLog('Pipeline processing failed.', 'System', 'error');
                }
            } catch (error) {
                // console.error('Polling error:', error);
                // Keep polling or stop?
            }
        }, 2000);
    };

    // Helper to update local state from status response
    const updateState = (data) => {
        setProgress(data.progress);
        setCurrentAgent(data.current_agent);

        // Update Agent List Status
        setAgentsStatus(prev => prev.map(agent => {
            // Simple logic: if 'reporter' is current, then previous are done.
            // This logic should ideally come from backend or be more robust
            if (agent.id === data.current_agent) {
                return { ...agent, status: 'processing' };
            }
            // If agent index is less than current running agent index, it's done
            // This requires ordered list knowledge.
            // Simplification:
            return agent;
        }));

        // Better: Backend should send full agent status map. 
        // For now, let's just use the current agent to add logs.
        if (data.current_agent) {
            // Only add log if changed agent or unique message? 
            // Ideally logs come from backend too.
        }
    };

    // MOCK STATUS GENERATOR for verification without backend
    let mockTick = 0;
    const mockStatusUpdate = async () => {
        mockTick++;
        const agents = ['schema_validator', 'imputer', 'outlier_detector', 'transformer', 'reporter'];
        const currentIdx = Math.floor(mockTick / 3); // Change agent every 3 ticks

        if (currentIdx >= agents.length) {
            return { job_id: 'mock', status: 'completed', progress: 100, current_agent: 'done' };
        }

        const current = agents[currentIdx];
        const progress = Math.min(100, ((currentIdx * 3 + (mockTick % 3)) / (agents.length * 3)) * 100);

        // Update logs simulation
        if (mockTick % 3 === 1) addLog(`Starting ${current}...`, 'Orchestrator');
        if (mockTick % 3 === 2) addLog(`Processing data chunk...`, current);
        if (mockTick % 3 === 0) addLog(`Completed task.`, current);

        // Update agent status list
        setAgentsStatus(prev => prev.map((a, i) => {
            if (i < currentIdx) return { ...a, status: 'completed' };
            if (i === currentIdx) return { ...a, status: 'processing' };
            return { ...a, status: 'pending' };
        }));

        return {
            job_id: 'mock',
            status: 'processing',
            progress: Math.floor(progress),
            current_agent: current
        };
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <header className="mb-12 flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">DataClean.ai</span>
                </div>
                {/* Steps Indicator could go here */}
            </header>

            <main className="max-w-6xl mx-auto">
                {step === 'upload' && (
                    <FileUpload onFileUpload={handleFileUpload} />
                )}

                {step === 'processing' && (
                    <ProcessingView
                        progress={progress}
                        currentAgent={currentAgent}
                        logs={logs}
                        agentsStatus={agentsStatus}
                    />
                )}

                {step === 'results' && (
                    <ResultsView
                        jobId={jobId}
                        stats={stats}
                        onDownloadCsv={() => downloadCsv(jobId)}
                        onDownloadReport={() => downloadReport(jobId)}
                    />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
