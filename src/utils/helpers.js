export const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'processing': return 'bg-blue-100 text-blue-800';
        case 'error': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};
