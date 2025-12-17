import { Request, Response } from 'express';
import { SystemParameter, RouteData, AircraftCost, HandlingRate, AirportCurrency, MarketBenchmark } from '../models';
import fs from 'fs';
import csv from 'csv-parser';

export const uploadData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dataType } = req.params;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const results: any[] = [];
    let uploadedCount = 0;

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        try {
          // Map data type to model
          switch (dataType) {
            case 'airport_currency':
              for (const row of results) {
                await AirportCurrency.findOrCreate({
                  where: { iataCode: row.IATA_Code },
                  defaults: {
                    iataCode: row.IATA_Code,
                    cityName: row.City_Name,
                    country: row.Country,
                    currencyCode: row.Currency_Code,
                    currencySymbol: row.Currency_Symbol,
                    exchangeRateToUsd: parseFloat(row.Exchange_Rate_to_USD),
                    region: row.Region,
                  },
                });
              }
              uploadedCount = results.length;
              break;

            case 'route_data':
              for (const row of results) {
                await RouteData.create({
                  routeCode: row.Route_Code,
                  carrierCode: row['carrier code'],
                  carrier: row.carrier,
                  operationRegion: row['Operation Region'],
                  equip: row.equip,
                  codeDep: row.code_dep,
                  codeArr: row.code_arr,
                  operationType: row['Operation Type'],
                  blockHours: parseFloat(row['Block Hours']),
                  distanceKm: parseInt(row['Distance (km)']),
                  capacityTonnes: parseFloat(row['Capacity (Tonnes)']),
                  capacityAtk: parseFloat(row['Capacity ATK (x1000)']),
                  weeklyFlightCount: parseInt(row['Weekly Flight Count']),
                });
              }
              uploadedCount = results.length;
              break;

            case 'aircraft_costs':
              for (const row of results) {
                await AircraftCost.findOrCreate({
                  where: { aircraftType: row.Aircraft_Type },
                  defaults: {
                    aircraftType: row.Aircraft_Type,
                    totalCostPerHour: parseFloat(row.Total_Cost_Per_Hour),
                    crewCost: parseFloat(row.Crew_Cost),
                    maintenanceCost: parseFloat(row.Maintenance_Cost),
                    fuelCost: parseFloat(row.Fuel_Cost),
                    depreciationCost: parseFloat(row.Depreciation_Cost),
                    insuranceCost: parseFloat(row.Insurance_Cost),
                    otherCost: parseFloat(row.Other_Cost),
                    fuelBurnRatePerHour: parseFloat(row.Fuel_Burn_Rate_L_Per_Hour),
                  },
                });
              }
              uploadedCount = results.length;
              break;

            case 'handling_rates':
              for (const row of results) {
                await HandlingRate.findOrCreate({
                  where: { airportCode: row.Airport_Code },
                  defaults: {
                    airportCode: row.Airport_Code,
                    airportName: row.Airport_Name,
                    city: row.City,
                    country: row.Country,
                    region: row.Region,
                    originRatePerKg: parseFloat(row.Origin_Rate_USD_Per_Kg),
                    destinationRatePerKg: parseFloat(row.Destination_Rate_USD_Per_Kg),
                  },
                });
              }
              uploadedCount = results.length;
              break;

            case 'market_benchmarks':
              for (const row of results) {
                await MarketBenchmark.create({
                  routeCode: row.Route_Code,
                  originAirportCode: row.origin_airport_code,
                  destinationAirportCode: row.destination_airport_code,
                  year: parseInt(row.year),
                  month: parseInt(row.month),
                  totalRate: parseFloat(row.total_rate),
                });
              }
              uploadedCount = results.length;
              break;

            default:
              res.status(400).json({ error: `Unknown data type: ${dataType}` });
              fs.unlinkSync(file.path);
              return;
          }

          // Clean up file
          fs.unlinkSync(file.path);

          res.status(200).json({
            message: `Successfully uploaded ${uploadedCount} records`,
            dataType,
            uploadedCount,
          });
        } catch (error) {
          console.error('Error processing CSV:', error);
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          res.status(500).json({ error: 'Error processing CSV data' });
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        res.status(500).json({ error: 'Error reading CSV file' });
      });
  } catch (error) {
    console.error('Error in uploadData:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const getDataPreview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dataType } = req.params;
    res.status(200).json({ message: `Preview for ${dataType}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get data preview' });
  }
};

export const downloadData = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'Download endpoint ready' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download data' });
  }
};

export const updateAircraft = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'Aircraft update endpoint ready' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update aircraft' });
  }
};

export const updateHandling = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'Handling update endpoint ready' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update handling' });
  }
};

export const getSystemParameters = async (req: Request, res: Response): Promise<void> => {
  try {
    const parameters = await SystemParameter.findAll();
    res.status(200).json(parameters);
  } catch (error) {
    console.error('Error fetching system parameters:', error);
    res.status(500).json({ error: 'Failed to fetch system parameters' });
  }
};

export const updateSystemParameters = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parameters } = req.body;

    if (!Array.isArray(parameters)) {
      res.status(400).json({ error: 'Parameters must be an array' });
      return;
    }

    // Update each parameter
    for (const param of parameters) {
      await SystemParameter.update(
        { parameterValue: param.parameterValue, updatedBy: 'admin' },
        { where: { parameterName: param.parameterName } }
      );
    }

    res.status(200).json({ message: 'Parameters updated successfully' });
  } catch (error) {
    console.error('Error updating system parameters:', error);
    res.status(500).json({ error: 'Failed to update system parameters' });
  }
};