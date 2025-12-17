import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { COLORS } from '../config/constants';
import { getOriginAirports, getDestinationAirports, getRouteSchedule } from '../services/api';
import { AirportCurrency, RouteData } from '../types';

export const ScheduleSearch: React.FC = () => {
  const [originAirports, setOriginAirports] = useState<AirportCurrency[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportCurrency[]>([]);
  const [origin, setOrigin] = useState<AirportCurrency | null>(null);
  const [destination, setDestination] = useState<AirportCurrency | null>(null);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routeData, setRouteData] = useState<RouteData[]>([]);
  const [searched, setSearched] = useState(false);

  // Load origin airports on mount
  useEffect(() => {
    const loadOriginAirports = async () => {
      try {
        setLoading(true);
        const airports = await getOriginAirports();
        setOriginAirports(airports);
      } catch (err) {
        setError('Failed to load airports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOriginAirports();
  }, []);

  // Load destination airports when origin changes
  useEffect(() => {
    const loadDestinationAirports = async () => {
      if (!origin) {
        setDestinationAirports([]);
        return;
      }

      try {
        setLoading(true);
        const airports = await getDestinationAirports(origin.iataCode);
        setDestinationAirports(airports);
      } catch (err) {
        console.error('Error loading destination airports:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDestinationAirports();
  }, [origin]);

  const handleSearch = async () => {
    if (!origin || !destination) {
      setError('Please select both origin and destination airports');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await getRouteSchedule(
        origin.iataCode,
        destination.iataCode,
        month,
        year
      );
      
      setRouteData(data);
      setSearched(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch route schedule data';
      setError(`Error: ${errorMessage}`);
      console.error('Route search error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        config: {
          origin: origin?.iataCode,
          destination: destination?.iataCode,
          month,
          year,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2024, i).toLocaleString('default', { month: 'long' }),
  }));

  // Generate year options (current year and next 2 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Search Form */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 1, mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, textTransform: 'uppercase' }}
        >
          Schedule Search
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
            Origin Airport
          </Typography>
          <Autocomplete
            options={originAirports}
            getOptionLabel={(option) => `${option.iataCode} - ${option.cityName}`}
            value={origin}
            onChange={(_, newValue) => {
              setOrigin(newValue);
              setDestination(null);
            }}
            disabled={loading}
            loading={loading}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select or type origin airport" size="small" />
            )}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
            Destination Airport
          </Typography>
          <Autocomplete
            options={destinationAirports}
            getOptionLabel={(option) => `${option.iataCode} - ${option.cityName}`}
            value={destination}
            onChange={(_, newValue) => setDestination(newValue)}
            disabled={!origin || loading}
            loading={loading}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select or type destination airport" size="small" />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
              Month
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {months.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
              Year
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSearch}
          disabled={!origin || !destination || loading}
          sx={{ bgcolor: COLORS.PRIMARY_ORANGE, fontWeight: 600, '&:hover': { bgcolor: '#e68a00' } }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Search Schedule'}
        </Button>
      </Paper>

      {/* Results Section */}
      {searched && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}
          >
            Route Schedule
          </Typography>

          {routeData.length === 0 ? (
            <Typography color="text.secondary">
              No schedule data available for the selected route and period.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                    <TableCell sx={{ fontWeight: 600 }}>Carrier</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Aircraft</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Weekly Flights
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Capacity (Tonnes)
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Block Hours
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Distance (km)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routeData.map((route) => (
                    <TableRow key={route.id} sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                      <TableCell sx={{ fontWeight: 600 }}>{route.carrier}</TableCell>
                      <TableCell>{route.equip}</TableCell>
                      <TableCell align="center">{route.weeklyFlightCount}</TableCell>
                      <TableCell align="center">
                        {(route.capacityTonnes || 0).toLocaleString('en-US', { maximumFractionDigits: 1 })}
                      </TableCell>
                      <TableCell align="center">
                        {(route.blockHours || 0).toLocaleString('en-US', { maximumFractionDigits: 1 })}
                      </TableCell>
                      <TableCell align="center">{(route.distanceKm || 0).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
    </Container>
  );
};
