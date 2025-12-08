import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData);
    return response.data;
};

export const startProcessing = async (jobId) => {
    const response = await api.post(`/process/${jobId}`);
    return response.data;
};

export const getJobStatus = async (jobId) => {
    const response = await api.get(`/status/${jobId}`);
    return response.data;
};

export const downloadCsv = (jobId) => {
    window.open(`${API_URL}/download/${jobId}/csv`, '_blank');
};

export const downloadReport = (jobId) => {
    window.open(`${API_URL}/download/${jobId}/report`, '_blank');
};
