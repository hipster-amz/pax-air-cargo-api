import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import sequelize from './config/database';
import { SystemParameter } from './models';

// Import routes (we'll create these next)
import airportRoutes from './routes/airports';
import calculationRoutes from './routes/calculation';
import adminRoutes from './routes/admin';
import scheduleRoutes from './routes/schedule';

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Routes
app.use('/api/airports', airportRoutes);
app.use('/api/calculate', calculationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/schedule', scheduleRoutes);

// Health check endpoint with database connection verification
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Initialize database
const PORT = process.env.PORT || 3000;

// Default system parameters
const DEFAULT_PARAMETERS = [
  { parameterName: 'security_screening_rate', parameterValue: 0.12, unit: 'USD_per_kg', description: 'Security screening for non-screened cargo' },
  { parameterName: 'documentation_fee', parameterValue: 30.00, unit: 'USD_flat', description: 'AWB processing flat fee per shipment' },
  { parameterName: 'cargo_allocation_percentage', parameterValue: 12, unit: 'percent', description: '% of flight cost allocated to belly cargo' },
  { parameterName: 'fuel_impact_factor', parameterValue: 1.5, unit: 'percent', description: 'Fuel impact per 100kg cargo weight' },
  { parameterName: 'current_fuel_price', parameterValue: 0.77, unit: 'USD_per_liter', description: 'Current jet fuel price' },
  { parameterName: 'default_margin', parameterValue: 20, unit: 'percent', description: 'Default margin for all routes' },
];

// Sync database and start server
const initializeApp = async () => {
  try {
    // Start server FIRST (don't wait for DB sync)
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Log environment for debugging
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
      DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
      DB_NAME: process.env.DB_NAME ? 'SET' : 'MISSING',
      PORT: process.env.PORT
    });

    // Sync models with database in background
    sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
      .then(async () => {
        console.log('Database synchronized');

        // Initialize system parameters if not exist
        const parameterCount = await SystemParameter.count();
        if (parameterCount === 0) {
          await SystemParameter.bulkCreate(DEFAULT_PARAMETERS);
          console.log('Default system parameters created');
        }
      })
      .catch((error) => {
        console.error('Error syncing database:', error);
      });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

initializeApp();