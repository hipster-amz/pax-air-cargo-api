// File: src/services/demandService.ts

import { CORRIDOR_CONFIGS, getCorridorType, getSeasonalityFactor, getCorridorConfig, SeasonalityData, CorridorConfig } from '../data/corridorSeasonality';

export interface DemandAnalysis {
  // Corridor information
  corridorType: string;
  corridorName: string;
  corridorMarketShare: number;
  corridorYoyGrowth: number;
  
  // Seasonality
  currentMonth: number;
  seasonalityIndex: number;
  seasonalityDriver: string;
  seasonalityRateImpact: string;
  peakMonth: number;
  monthsUntilPeak: number;
  
  // Competition metrics
  carrierCount: number;
  weeklyFlights: number;
  competitionLevel: string;
  competitionFactor: number;
  
  // Yield environment
  yieldPremium: number;
  
  // Combined factors
  combinedDemandFactor: number;
  demandAdjustedRate: number;
  
  // Assessment
  demandLevel: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';
  marketTiming: 'OFF_PEAK' | 'SHOULDER' | 'PEAK';
  
  // Explanation
  demandExplanation: string;
  recommendation: string;
}

/**
 * Calculate competition factor based on carrier count and flight frequency
 * Based on research showing high-growth routes command +10-20% premiums
 */
const calculateCompetitionFactor = (
  carrierCount: number,
  weeklyFlights: number
): { factor: number; level: string } => {
  // Competition score (0-100)
  const competitionScore = Math.min(carrierCount * 10, 50) + Math.min(weeklyFlights * 1.5, 50);
  
  let factor: number;
  let level: string;
  
  if (competitionScore < 25) {
    factor = 0.92; // Limited service = potential discount
    level = 'Very Limited';
  } else if (competitionScore < 40) {
    factor = 0.96;
    level = 'Limited';
  } else if (competitionScore < 60) {
    factor = 1.00; // Baseline
    level = 'Moderate';
  } else if (competitionScore < 80) {
    factor = 1.04; // Competitive = slight premium
    level = 'Competitive';
  } else {
    factor = 1.08; // Highly competitive = strong demand signal
    level = 'Highly Competitive';
  }
  
  return { factor, level };
};

/**
 * Determine market timing relative to peak
 */
const getMarketTiming = (seasonalityIndex: number): DemandAnalysis['marketTiming'] => {
  if (seasonalityIndex >= 1.10) return 'PEAK';
  if (seasonalityIndex >= 0.95) return 'SHOULDER';
  return 'OFF_PEAK';
};

/**
 * Determine overall demand level
 */
const getDemandLevel = (combinedFactor: number): DemandAnalysis['demandLevel'] => {
  if (combinedFactor < 0.90) return 'VERY_LOW';
  if (combinedFactor < 0.97) return 'LOW';
  if (combinedFactor < 1.05) return 'MODERATE';
  if (combinedFactor < 1.15) return 'HIGH';
  return 'VERY_HIGH';
};

/**
 * Generate recommendation based on analysis
 */
const generateRecommendation = (
  marketTiming: DemandAnalysis['marketTiming'],
  demandLevel: DemandAnalysis['demandLevel'],
  monthsUntilPeak: number,
  corridorYoyGrowth: number
): string => {
  const parts: string[] = [];
  
  // Timing recommendation
  if (marketTiming === 'OFF_PEAK') {
    parts.push('Current off-peak timing offers negotiation leverage.');
  } else if (marketTiming === 'PEAK') {
    parts.push('Peak season pricing in effect - limited negotiation room.');
  } else {
    parts.push('Shoulder season - moderate pricing flexibility.');
  }
  
  // Forward planning
  if (monthsUntilPeak > 0 && monthsUntilPeak <= 3) {
    parts.push(`Peak season in ${monthsUntilPeak} month${monthsUntilPeak > 1 ? 's' : ''} - consider booking ahead.`);
  } else if (monthsUntilPeak > 3) {
    parts.push('Well ahead of peak - favorable timing for rate negotiations.');
  }
  
  // Growth context
  if (corridorYoyGrowth > 5) {
    parts.push('Strong corridor growth (+' + corridorYoyGrowth.toFixed(1) + '% YoY) supports carrier pricing power.');
  } else if (corridorYoyGrowth < -2) {
    parts.push('Declining corridor volumes (' + corridorYoyGrowth.toFixed(1) + '% YoY) may create negotiation opportunities.');
  }
  
  return parts.join(' ');
};

/**
 * Generate explanation text
 */
const generateExplanation = (
  corridorName: string,
  seasonalityIndex: number,
  seasonalityDriver: string,
  competitionLevel: string,
  carrierCount: number,
  weeklyFlights: number,
  combinedFactor: number
): string => {
  const seasonalPct = ((seasonalityIndex - 1) * 100).toFixed(0);
  const seasonalDirection = seasonalityIndex >= 1 ? 'premium' : 'discount';
  const combinedPct = ((combinedFactor - 1) * 100).toFixed(0);
  const combinedDirection = combinedFactor >= 1 ? 'premium' : 'discount';
  
  let explanation = `${corridorName} corridor: ${seasonalityDriver}. `;
  
  if (Math.abs(parseFloat(seasonalPct)) > 0) {
    explanation += `Seasonal factors indicate a ${Math.abs(parseFloat(seasonalPct))}% ${seasonalDirection}. `;
  }
  
  explanation += `Route has ${competitionLevel.toLowerCase()} competition with ${carrierCount} carrier${carrierCount !== 1 ? 's' : ''} and ${weeklyFlights} weekly flights. `;
  
  if (Math.abs(parseFloat(combinedPct)) > 0) {
    explanation += `Combined demand adjustment: ${parseFloat(combinedPct) > 0 ? '+' : ''}${combinedPct}% ${combinedDirection}.`;
  } else {
    explanation += 'No significant demand adjustment applied.';
  }
  
  return explanation;
};

/**
 * Main function to analyze demand for a route
 */
export const analyzeDemand = (
  originCode: string,
  destinationCode: string,
  shouldCostPerKg: number,
  carrierCount: number,
  weeklyFlights: number,
  month?: number // Optional - defaults to current month
): DemandAnalysis => {
  // Get current month if not provided
  const currentMonth = month || new Date().getMonth() + 1;
  
  // Determine corridor
  const corridorType = getCorridorType(originCode, destinationCode);
  const corridorConfig = getCorridorConfig(corridorType);
  
  // Get seasonality for current month
  const seasonality = getSeasonalityFactor(corridorType, currentMonth);
  
  // Calculate months until peak
  const peakMonth = corridorConfig.peakMonth;
  let monthsUntilPeak = peakMonth - currentMonth;
  if (monthsUntilPeak < 0) monthsUntilPeak += 12;
  if (monthsUntilPeak === 0) monthsUntilPeak = 0; // We're in peak
  
  // Calculate competition factor
  const { factor: competitionFactor, level: competitionLevel } = calculateCompetitionFactor(carrierCount, weeklyFlights);
  
  // Get yield premium for corridor
  const yieldPremium = corridorConfig.yieldPremium;
  
  // Calculate combined demand factor
  // We use seasonality as the primary driver, modulated by competition
  // Note: We don't multiply by yieldPremium here as that's a market-wide adjustment
  // The yieldPremium is informational - it explains why market rates are elevated
  const combinedDemandFactor = seasonality.index * competitionFactor;
  
  // Calculate demand-adjusted rate
  const demandAdjustedRate = shouldCostPerKg * combinedDemandFactor;
  
  // Determine market timing and demand level
  const marketTiming = getMarketTiming(seasonality.index);
  const demandLevel = getDemandLevel(combinedDemandFactor);
  
  // Generate explanation and recommendation
  const demandExplanation = generateExplanation(
    corridorConfig.displayName,
    seasonality.index,
    seasonality.keyDriver,
    competitionLevel,
    carrierCount,
    weeklyFlights,
    combinedDemandFactor
  );
  
  const recommendation = generateRecommendation(
    marketTiming,
    demandLevel,
    monthsUntilPeak,
    corridorConfig.yoyGrowth
  );
  
  return {
    corridorType,
    corridorName: corridorConfig.displayName,
    corridorMarketShare: corridorConfig.marketShare,
    corridorYoyGrowth: corridorConfig.yoyGrowth,
    currentMonth,
    seasonalityIndex: seasonality.index,
    seasonalityDriver: seasonality.keyDriver,
    seasonalityRateImpact: seasonality.rateImpact,
    peakMonth,
    monthsUntilPeak,
    carrierCount,
    weeklyFlights,
    competitionLevel,
    competitionFactor,
    yieldPremium,
    combinedDemandFactor: Math.round(combinedDemandFactor * 1000) / 1000,
    demandAdjustedRate: Math.round(demandAdjustedRate * 100) / 100,
    demandLevel,
    marketTiming,
    demandExplanation,
    recommendation,
  };
};
