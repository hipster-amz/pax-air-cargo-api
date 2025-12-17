import React, { useState } from 'react';
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  LinearProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { COLORS } from '../../config/constants';
import apiClient from '../../services/api';

interface FileUploadWidgetProps {
  dataType: string;
  displayName: string;
}

export const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({ dataType, displayName }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please select a CSV file');
        return;
      }
      setFile(selectedFile);
      setError('');
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(`/admin/upload/${dataType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(Math.round(progress));
          }
        },
      });

      setSuccess(true);
      setFile(null);
      setUploadProgress(0);
      console.log('Upload successful:', response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: COLORS.DARK_BLUE_GRAY }}>
        Upload {displayName}
      </Typography>

      <Paper
        sx={{
          p: 3,
          border: `2px dashed ${COLORS.LIGHT_GRAY}`,
          borderRadius: 1,
          textAlign: 'center',
          backgroundColor: '#fafafa',
          mb: 2,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: COLORS.PRIMARY_ORANGE, mb: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag and drop your CSV file here, or click to browse
        </Typography>

        <input
          type="file"
          id={`file-input-${dataType}`}
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => document.getElementById(`file-input-${dataType}`)?.click()}
          >
            Select File
          </Button>
        </Box>

        {file && (
          <Typography variant="body2" sx={{ mt: 2, fontWeight: 600 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Upload successful!</Alert>}

      {loading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="caption" sx={{ mt: 1 }}>
            {uploadProgress}%
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || loading}
        sx={{
          bgcolor: COLORS.PRIMARY_ORANGE,
          '&:hover': { bgcolor: '#e68a00' },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload File'}
      </Button>
    </Box>
  );
};

export default FileUploadWidget;