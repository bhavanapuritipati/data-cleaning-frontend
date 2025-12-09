# Data Polisher Frontend

A modern, intuitive web interface for the Data Polisher API. Built with React, Vite, and Tailwind CSS, providing a seamless experience for uploading CSV files, monitoring data cleaning progress, and downloading cleaned datasets.

**Live App**: [https://data-polisher-ui.vercel.app/](https://data-polisher-ui.vercel.app/)  
**Backend API**: [https://data-polisher.onrender.com](https://data-polisher.onrender.com)  
**API Docs**: [https://data-polisher.onrender.com/docs](https://data-polisher.onrender.com/docs)

## ✨ Features

### User-Friendly Interface
- **Drag & Drop Upload**: Easy CSV file upload with drag-and-drop support
- **Real-time Progress**: Live updates via WebSocket showing pipeline progress
- **Visual Feedback**: Beautiful UI with animations and status indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Data Cleaning Workflow
1. **Upload**: Select or drag CSV file to upload
2. **Process**: Monitor real-time progress through cleaning pipeline
3. **Review**: View comprehensive cleaning report with statistics
4. **Download**: Get cleaned CSV file and detailed report

### Pipeline Visualization
- **Agent Status**: Visual representation of each pipeline stage
  - Schema Validation
  - Missing Value Imputation
  - Outlier Detection
  - Data Transformation
  - Report Generation
- **Progress Tracking**: Real-time progress percentage and status updates
- **Error Handling**: Clear error messages and recovery options

### Report Viewer
- **Comprehensive Reports**: View detailed cleaning reports
- **Statistics**: See column statistics, missing values, outliers detected
- **Transformations**: Review all transformations applied
- **Export Options**: Download cleaned data and reports

## Technology Stack

- **React 19**: Modern React with latest features
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library
- **WebSocket API**: Real-time updates

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-cleaning-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API endpoint**
   
   Update the API base URL in `src/services/api.js` if needed:
   ```javascript
   const API_BASE_URL = 'https://data-polisher.onrender.com/api/v1';
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## Project Structure

```
data-cleaning-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── FileUpload.jsx
│   │   ├── ProcessingView.jsx
│   │   ├── AgentStatus.jsx
│   │   ├── ResultsView.jsx
│   │   └── ReportViewer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   └── Dashboard.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── utils/          # Utility functions
│   │   └── helpers.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Components

### FileUpload
Handles CSV file upload with drag-and-drop functionality and file validation.

### ProcessingView
Displays real-time progress during data cleaning with WebSocket updates.

### AgentStatus
Visual component showing the status of each pipeline agent.

### ResultsView
Shows final results with download options for cleaned data and reports.

### ReportViewer
Comprehensive report viewer displaying cleaning statistics and transformations.

## API Integration

The frontend communicates with the backend API through:

### REST Endpoints
- `POST /api/v1/upload` - Upload CSV file
- `POST /api/v1/process/{job_id}` - Start processing
- `GET /api/v1/status/{job_id}` - Check job status
- `GET /api/v1/download/{job_id}/csv` - Download cleaned CSV
- `GET /api/v1/download/{job_id}/report` - Download report

### WebSocket
- `WS /api/v1/ws/{job_id}` - Real-time progress updates

## Build for Production

1. **Build the project**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

The build output will be in the `dist/` directory.

## Deployment

The frontend is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Deploy!

### Environment Variables (if needed)
```env
VITE_API_BASE_URL=https://data-polisher.onrender.com/api/v1
```

## Features in Detail

### Real-time Updates
The app uses WebSocket connections to receive real-time progress updates during data cleaning, providing instant feedback to users.

### File Validation
- Checks file type (CSV only)
- Validates file size
- Provides clear error messages

### Progress Tracking
- Visual progress bar
- Agent status indicators
- Detailed progress messages
- Error state handling

### Data Export
- Download cleaned CSV file
- Download JSON report
- View report in browser

## Styling

The project uses Tailwind CSS for styling with:
- Custom color palette
- Responsive utilities
- Dark mode support (if implemented)
- Smooth animations with Framer Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Verify API URL is correct in `src/services/api.js`
- Check CORS settings on backend
- Ensure backend is running and accessible

### WebSocket Connection Issues
- Verify WebSocket URL format
- Check network connectivity
- Ensure backend WebSocket endpoint is accessible


## 🔗 Related Links

- [Backend Repository](https://github.com/bhavanapuritipati/data-cleaning-backend)
- [Live API](https://data-polisher.onrender.com)
- [API Documentation](https://data-polisher.onrender.com/docs)
