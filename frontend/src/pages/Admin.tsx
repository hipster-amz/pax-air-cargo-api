import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { COLORS } from '../config/constants';
import FileUploadWidget from '../components/admin/FileUploadWidget';
import SystemParametersWidget from '../components/admin/SystemParametersWidget';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const Admin: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={2} sx={{ borderRadius: 1 }}>
        {/* Header */}
        <Box sx={{ backgroundColor: COLORS.DARK_BLUE_GRAY, p: 3, color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            ADMIN PANEL
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            Manage data files and system parameters
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: `1px solid ${COLORS.LIGHT_GRAY}`,
            px: 2,
          }}
        >
          <Tab label="Route Data" />
          <Tab label="Market Benchmarks" />
          <Tab label="Aircraft Costs" />
          <Tab label="Handling Rates" />
          <Tab label="System Parameters" />
        </Tabs>

        {/* Tab Content */}
        <TabPanel value={tabValue} index={0}>
          <FileUploadWidget dataType="route_data" displayName="Route Data" />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FileUploadWidget dataType="market_benchmarks" displayName="Market Benchmarks" />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <FileUploadWidget dataType="aircraft_costs" displayName="Aircraft Costs" />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <FileUploadWidget dataType="handling_rates" displayName="Handling Rates" />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <SystemParametersWidget />
        </TabPanel>
      </Paper>
    </Container>
  );
};