import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { COLORS } from '../../config/constants';
import apiClient from '../../services/api';

interface SystemParameter {
  parameterName: string;
  parameterValue: number;
  unit: string;
  description: string;
}

export const SystemParametersWidget: React.FC = () => {
  const [parameters, setParameters] = useState<SystemParameter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParameters();
  }, []);

  const fetchParameters = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/parameters');
      setParameters(response.data);
    } catch (err) {
      setError('Failed to load parameters');
      console.error('Error fetching parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleParameterChange = (parameterName: string, newValue: number) => {
    setParameters(
      parameters.map((param) =>
        param.parameterName === parameterName
          ? { ...param, parameterValue: newValue }
          : param
      )
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess(false);

      await apiClient.put('/admin/parameters', { parameters });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save parameters');
      console.error('Error saving parameters:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: COLORS.DARK_BLUE_GRAY }}>
        System Parameters
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Adjust system-wide settings used in all calculations
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Parameters saved successfully!</Alert>}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
  {parameters.map((param) => (
    <Paper key={param.parameterName} sx={{ p: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {param.description}
      </Typography>
      <TextField
        fullWidth
        type="number"
        inputProps={{ step: '0.01' }}
        value={param.parameterValue}
        onChange={(e) =>
          handleParameterChange(param.parameterName, parseFloat(e.target.value))
        }
        label={`Value (${param.unit})`}
        size="small"
        sx={{ mb: 1 }}
      />
      <Typography variant="caption" color="text.secondary">
        Parameter: {param.parameterName}
      </Typography>
    </Paper>
  ))}
</Box>

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={saving}
        sx={{
          bgcolor: COLORS.PRIMARY_ORANGE,
          '&:hover': { bgcolor: '#e68a00' },
        }}
      >
        {saving ? <CircularProgress size={24} color="inherit" /> : 'Save All Parameters'}
      </Button>
    </Box>
  );
};

export default SystemParametersWidget;