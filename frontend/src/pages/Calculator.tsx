import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import { COLORS } from '../config/constants';
import { useCalculator } from '../hooks/useCalculator';
import { CalculationResult } from '../types';
import { getCarrierBreakdown } from '../services/api';

export const Calculator: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isPreScreened, setIsPreScreened] = useState<boolean>(true);
  const [handlingModel, setHandlingModel] = useState<'DAA' | 'FF'>('DAA');
  const [showCarrierDialog, setShowCarrierDialog] = useState(false);
  const [carrierLoading, setCarrierLoading] = useState(false);
  const [carrierData, setCarrierData] = useState<any[]>([]);
  const { originAirports, destinationAirports, loading, error, result, handleOriginChange, handleCalculate } =
    useCalculator();
  
  const handleOriginSelect = (value: string) => {
    setOrigin(value);
    setDestination('');
    handleOriginChange(value);
  };

  const handleCalculateClick = async () => {
    if (!origin || !destination) return;
    await handleCalculate(origin, destination, isPreScreened, handlingModel);
  };

  const handleViewCarriers = async () => {
    setCarrierLoading(true);
    try {
      console.log('Fetching carriers for:', origin, destination);
      const data = await getCarrierBreakdown(origin, destination, isPreScreened, handlingModel);
      console.log('Carrier data received:', data);
      setCarrierData(data);
      setShowCarrierDialog(true);
    } catch (err) {
      console.error('Error fetching carrier data:', err);
    } finally {
      setCarrierLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Route Selection Form */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 1, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, textTransform: 'uppercase' }}>
          Route Selection
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
          Origin Airport
        </Typography>
        <FormControl fullWidth size="small">
          <Select value={origin} onChange={(e) => handleOriginSelect(e.target.value)} disabled={loading}>
            <MenuItem value="">
              <em>Select Origin</em>
            </MenuItem>
            {originAirports.map((airport: any) => (
              <MenuItem key={airport.iataCode} value={airport.iataCode}>
                {airport.iataCode} - {airport.cityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
          Destination Airport
        </Typography>
        <FormControl fullWidth size="small">
          <Select value={destination} onChange={(e) => setDestination(e.target.value)} disabled={!origin || loading}>
            <MenuItem value="">
              <em>Select Destination</em>
            </MenuItem>
            {destinationAirports.map((airport: any) => (
              <MenuItem key={airport.iataCode} value={airport.iataCode}>
                {airport.iataCode} - {airport.cityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
            Security Screening
          </Typography>
          <FormControl component="fieldset" size="small">
            <RadioGroup value={isPreScreened ? 'screened' : 'unscreened'} onChange={(e) => setIsPreScreened(e.target.value === 'screened')}>
              <FormControlLabel value="screened" control={<Radio size="small" />} label="Screened" />
              <FormControlLabel value="unscreened" control={<Radio size="small" />} label="Unscreened" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: COLORS.DARK_BLUE_GRAY }}>
            Handling Model
          </Typography>
          <FormControl component="fieldset" size="small">
            <RadioGroup value={handlingModel} onChange={(e) => setHandlingModel(e.target.value as 'DAA' | 'FF')}>
              <FormControlLabel value="DAA" control={<Radio size="small" />} label="DAA Delivery of Cargo" />
              <FormControlLabel value="FF" control={<Radio size="small" />} label="Freight Forwarder" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleCalculateClick} 
            disabled={!origin || !destination || loading} 
            sx={{ bgcolor: COLORS.PRIMARY_ORANGE, fontWeight: 600, '&:hover': { bgcolor: '#e68a00' } }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Calculate Should-Cost'}
          </Button>
        </Box>
      </Paper>

      {/* Loading State */}
      {loading && (
        <Paper elevation={2} sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Paper>
      )}

      {/* Initial State */}
      {!loading && !result && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 1 }}>
            Route Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select airports and click Calculate to see results.
          </Typography>
        </Paper>
      )}

      {/* Results */}
      {!loading && result && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Route Summary */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}>
              Route Summary
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                    <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Distance</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{result.distance.toLocaleString()} km</TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Average Cargo Capacity</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{(result.avgCapacityKg / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })} tonnes</TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Average ATK</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{(result.avgCapacityKg * result.avgBlockHours / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} ATK</TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Average Block Hours</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{result.avgBlockHours.toFixed(1)} hrs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary' }}>Weekly Flights</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>21</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Should-Cost Breakdown */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}>
              Should-Cost Breakdown
            </Typography>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: COLORS.DARK_BLUE_GRAY }}>
                    <TableCell sx={{ fontWeight: 600, color: 'white' }}>Component</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'white' }}>Unitings</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'white' }}>% of Total</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'white' }}>Visualization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(() => {
                    const costs = [
                      { component: 'Flight Operating Cost', value: result.flightCostPerKg, color: '#FF9900' },
                      { component: 'Fuel Cost', value: result.actualFuelCostPerKg, color: '#FFC107' },
                      { component: 'Crew Handling', value: result.originHandlingPerKg * 0.3, color: '#4CAF50' },
                      { component: 'Fuel Surcharge', value: result.actualFuelCostPerKg * 0.15, color: '#FF6B6B' },
                      { component: 'Security Screening', value: result.securityScreeningPerKg, color: '#2196F3' },
                      { component: 'Documentation', value: result.documentationPerKg, color: '#9C27B0' },
                      { component: 'Other Costs', value: result.originHandlingPerKg * 0.2, color: '#FF5722' },
                    ];
                    const totalCost = costs.reduce((sum, cost) => sum + cost.value, 0);
                    
                    return costs.map((cost, index) => {
                      const percentage = (cost.value / totalCost) * 100;
                      return (
                        <TableRow key={index} sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                          <TableCell sx={{ fontWeight: 500 }}>{cost.component}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>${cost.value.toFixed(2)}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>{percentage.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                width: '100%',
                                height: '20px',
                                backgroundColor: COLORS.LIGHT_GRAY,
                                borderRadius: '2px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  height: '100%',
                                  width: `${Math.min(percentage * 2, 100)}%`,
                                  backgroundColor: cost.color,
                                  transition: 'width 0.3s ease',
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    });
                  })()}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, p: 3, backgroundColor: '#f9f9f9', borderRadius: 1, borderTop: `1px solid ${COLORS.LIGHT_GRAY}`, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Total Should-Cost</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Per KG</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: COLORS.PRIMARY_ORANGE }}>
                  ${result.shouldCostPerKg.toFixed(2)}/kg
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Market Comparison */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}>
              Market Comparison
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                    <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Your Should-Cost</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: COLORS.PRIMARY_ORANGE }}>${result.shouldCostPerKg.toFixed(2)}/kg</TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                    <TableCell sx={{ color: 'text.secondary' }}>IATA Benchmark</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>${result.marketRate?.toFixed(2) || 'N/A'}/kg</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary' }}>Assessment</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'inline-block',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {result.assessment || '⚠ OVERPRICED'}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Demand & Seasonality Analysis */}
          {result.demandAnalysis && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}>
                Demand & Seasonality Analysis
              </Typography>

              {/* Corridor Info */}
              <Box sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: COLORS.DARK_BLUE_GRAY }}>
                  {result.demandAnalysis.corridorName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Market Share</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {result.demandAnalysis.corridorMarketShare}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">YoY Growth</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: result.demandAnalysis.corridorYoyGrowth >= 0 ? '#28a745' : '#dc3545',
                      }}
                    >
                      {result.demandAnalysis.corridorYoyGrowth >= 0 ? '+' : ''}
                      {result.demandAnalysis.corridorYoyGrowth}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Peak Month</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(2024, result.demandAnalysis.peakMonth - 1).toLocaleString('default', { month: 'long' })}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Seasonality Gauge */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Current Seasonality Index
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor:
                          result.demandAnalysis.marketTiming === 'PEAK' ? '#f8d7da' :
                          result.demandAnalysis.marketTiming === 'SHOULDER' ? '#fff3cd' :
                          '#d4edda',
                        color:
                          result.demandAnalysis.marketTiming === 'PEAK' ? '#721c24' :
                          result.demandAnalysis.marketTiming === 'SHOULDER' ? '#856404' :
                          '#155724',
                      }}
                    >
                      {result.demandAnalysis.marketTiming.replace('_', '-')}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {result.demandAnalysis.seasonalityIndex.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Seasonality bar visualization */}
                <Box sx={{ position: 'relative', height: 24, mb: 1 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '100%',
                      background: 'linear-gradient(to right, #28a745 0%, #ffc107 40%, #ffc107 60%, #dc3545 100%)',
                      borderRadius: 1,
                      opacity: 0.3,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -4,
                      left: `${((result.demandAnalysis.seasonalityIndex - 0.8) / 0.45) * 100}%`,
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 32,
                      backgroundColor: COLORS.DARK_BLUE_GRAY,
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">0.80 (Off-Peak)</Typography>
                  <Typography variant="caption" color="text.secondary">1.00 (Baseline)</Typography>
                  <Typography variant="caption" color="text.secondary">1.25 (Peak)</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Driver:</strong> {result.demandAnalysis.seasonalityDriver}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rate Impact:</strong> {result.demandAnalysis.seasonalityRateImpact}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Competition & Demand Factors */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Competition Level</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {result.demandAnalysis.competitionLevel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {result.demandAnalysis.carrierCount} carriers, {result.demandAnalysis.weeklyFlights} flights/week
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Competition Factor</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: result.demandAnalysis.competitionFactor >= 1 ? '#dc3545' : '#28a745',
                    }}
                  >
                    {result.demandAnalysis.competitionFactor >= 1 ? '+' : ''}
                    {((result.demandAnalysis.competitionFactor - 1) * 100).toFixed(0)}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Demand Level</Typography>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      backgroundColor:
                        result.demandAnalysis.demandLevel === 'VERY_HIGH' ? '#f8d7da' :
                        result.demandAnalysis.demandLevel === 'HIGH' ? '#fff3cd' :
                        result.demandAnalysis.demandLevel === 'MODERATE' ? '#d4edda' :
                        result.demandAnalysis.demandLevel === 'LOW' ? '#d1ecf1' :
                        '#e2e3e5',
                      color:
                        result.demandAnalysis.demandLevel === 'VERY_HIGH' ? '#721c24' :
                        result.demandAnalysis.demandLevel === 'HIGH' ? '#856404' :
                        result.demandAnalysis.demandLevel === 'MODERATE' ? '#155724' :
                        result.demandAnalysis.demandLevel === 'LOW' ? '#0c5460' :
                        '#383d41',
                    }}
                  >
                    {result.demandAnalysis.demandLevel.replace('_', ' ')}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Months Until Peak</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {result.demandAnalysis.monthsUntilPeak === 0
                      ? '🔥 Currently in Peak'
                      : `${result.demandAnalysis.monthsUntilPeak} month${result.demandAnalysis.monthsUntilPeak !== 1 ? 's' : ''}`}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Demand-Adjusted Rate Calculation */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: COLORS.DARK_BLUE_GRAY }}>
                  Demand-Adjusted Pricing
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Base Should-Cost</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${result.shouldCostPerKg.toFixed(2)}/kg
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="text.secondary">×</Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Demand Factor</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: result.demandAnalysis.combinedDemandFactor >= 1 ? '#dc3545' : '#28a745',
                      }}
                    >
                      {result.demandAnalysis.combinedDemandFactor.toFixed(3)}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="text.secondary">=</Typography>
                  <Box sx={{ textAlign: 'center', p: 1.5, backgroundColor: 'white', borderRadius: 1, border: `2px solid ${COLORS.PRIMARY_ORANGE}` }}>
                    <Typography variant="caption" color="text.secondary">Demand-Adjusted Rate</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.PRIMARY_ORANGE }}>
                      ${result.demandAnalysis.demandAdjustedRate.toFixed(2)}/kg
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Explanation */}
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  backgroundColor: '#e7f3ff',
                  '& .MuiAlert-icon': { color: '#0066cc' },
                }}
              >
                <Typography variant="body2">
                  {result.demandAnalysis.demandExplanation}
                </Typography>
              </Alert>

              {/* Recommendation */}
              <Alert
                severity={
                  result.demandAnalysis.marketTiming === 'PEAK' ? 'warning' :
                  result.demandAnalysis.marketTiming === 'OFF_PEAK' ? 'success' :
                  'info'
                }
                sx={{ backgroundColor: '#f8f9fa' }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  💡 {result.demandAnalysis.recommendation}
                </Typography>
              </Alert>
            </Paper>
          )}

          {/* Regional Context */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: COLORS.DARK_BLUE_GRAY, fontWeight: 600, mb: 2, textTransform: 'uppercase' }}>
              Regional Context
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: COLORS.DARK_BLUE_GRAY }}>
                Origin Region: West Coast US
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Avg Handling Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Year Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Market Practices</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ borderBottom: `1px solid ${COLORS.LIGHT_GRAY}` }}>
                      <TableCell>$0.27/kg</TableCell>
                      <TableCell>$0.27/kg (2-Year average)</TableCell>
                      <TableCell>Typical practices</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: COLORS.DARK_BLUE_GRAY }}>
                Destination Region: Greater China
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Avg Handling Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Year Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Market Practices</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>$0.50/kg</TableCell>
                      <TableCell>$0.50/kg (2-Year average)</TableCell>
                      <TableCell>Typical practices</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>

          {/* Export Actions */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                const emailBody = `Should-Cost Analysis Report\nRoute: ${origin} to ${destination}\nShould-Cost Rate: $${result.shouldCostPerKg.toFixed(2)}/kg`;
                window.location.href = `mailto:?subject=PAX Air Cargo Should-Cost Report&body=${encodeURIComponent(emailBody)}`;
              }}
              sx={{
                borderColor: COLORS.PRIMARY_ORANGE,
                color: COLORS.PRIMARY_ORANGE,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 153, 0, 0.05)',
                },
              }}
            >
              Export to Email
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                const pdfWindow = window.open('', '', 'height=400,width=800');
                if (pdfWindow) {
                  pdfWindow.document.write(`
                    <html><head><title>PAX Air Cargo Should-Cost Report</title><style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #232f3e; }
                    .section { margin: 20px 0; padding: 15px; border: 1px solid #ccc; }
                    .rate { font-size: 24px; font-weight: bold; color: #FF9900; }
                    </style></head><body>
                    <h1>PAX Air Cargo Should-Cost Analysis</h1>
                    <div class="section">
                      <h2>Route Information</h2>
                      <p><strong>Route:</strong> ${origin} → ${destination}</p>
                      <p><strong>Distance:</strong> ${result.distance.toLocaleString()} km</p>
                    </div>
                    <div class="section">
                      <h2>Should-Cost Rate</h2>
                      <p class="rate">$${result.shouldCostPerKg.toFixed(2)}/kg</p>
                    </div>
                    </body></html>
                  `);
                  pdfWindow.document.close();
                  pdfWindow.print();
                }
              }}
              sx={{
                backgroundColor: COLORS.PRIMARY_ORANGE,
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e68a00',
                },
              }}
            >
              Export to PDF
            </Button>
          </Box>

          {/* View Carriers Button */}
          {result && (
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={handleViewCarriers}
              sx={{ 
                borderColor: COLORS.PRIMARY_ORANGE, 
                color: COLORS.PRIMARY_ORANGE,
                fontWeight: 600,
                mt: 1,
              }}
            >
              View Airline Details
            </Button>
          )}
        </Box>
      )}

      {/* Carrier Dialog */}
      <Dialog open={showCarrierDialog} onClose={() => setShowCarrierDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: COLORS.DARK_BLUE_GRAY, color: 'white', fontWeight: 600 }}>
          Carrier Breakdown: {origin} → {destination}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${COLORS.LIGHT_GRAY}` }}>
            <Table>
              <TableHead sx={{ backgroundColor: COLORS.LIGHT_GRAY }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Airline</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Aircraft</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Weekly Flights</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Should-Cost/kg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carrierLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : carrierData.length > 0 ? (
                  carrierData.map((carrier) => (
                    <TableRow key={carrier.carrierCode} sx={{ '&:hover': { backgroundColor: COLORS.LIGHT_GRAY } }}>
                      <TableCell>{carrier.carrierName}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{carrier.carrierCode}</TableCell>
                      <TableCell>{carrier.aircraftType}</TableCell>
                      <TableCell>{carrier.weeklyFlights}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: COLORS.PRIMARY_ORANGE }}>
                        ${carrier.shouldCostPerKg.toFixed(2)}/kg
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary">No carrier data available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: COLORS.LIGHT_GRAY, borderRadius: 1 }}>
            📋 This table will display each airline operating this route with their specific aircraft, weekly frequencies, and individual should-cost calculations.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowCarrierDialog(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
