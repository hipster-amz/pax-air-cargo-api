import { Sequelize } from 'sequelize';
import path from 'path';
import * as models from './src/models';

async function migrateToSQLite() {
  // Source: Local PostgreSQL
  const pgSequelize = new Sequelize(
    'pax_cargo',
    'postgres',
    'Fluxbar9!',
    {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false,
    }
  );

  // Destination: SQLite
  const sqliteSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'data', 'database.sqlite'),
    logging: false,
  });

  try {
    console.log('Testing PostgreSQL connection...');
    await pgSequelize.authenticate();
    console.log('✓ PostgreSQL connected');

    console.log('Creating SQLite tables...');
    await sqliteSequelize.sync({ force: true });
    console.log('✓ SQLite tables created');

    // Define models for both databases
    const pgModels = {
      AircraftCost: pgSequelize.define('AircraftCost', models.AircraftCost),
      AirportCurrency: pgSequelize.define('AirportCurrency', models.AirportCurrency),
      HandlingRate: pgSequelize.define('HandlingRate', models.HandlingRate),
      MarketBenchmark: pgSequelize.define('MarketBenchmark', models.MarketBenchmark),
      RouteData: pgSequelize.define('RouteData', models.RouteData),
      SystemParameter: pgSequelize.define('SystemParameter', models.SystemParameter),
      AuditLog: pgSequelize.define('AuditLog', models.AuditLog),
    };

    const sqliteModels = {
      AircraftCost: sqliteSequelize.define('AircraftCost', models.AircraftCost),
      AirportCurrency: sqliteSequelize.define('AirportCurrency', models.AirportCurrency),
      HandlingRate: sqliteSequelize.define('HandlingRate', models.HandlingRate),
      MarketBenchmark: sqliteSequelize.define('MarketBenchmark', models.MarketBenchmark),
      RouteData: sqliteSequelize.define('RouteData', models.RouteData),
      SystemParameter: sqliteSequelize.define('SystemParameter', models.SystemParameter),
      AuditLog: sqliteSequelize.define('AuditLog', models.AuditLog),
    };

    // Copy data from each table
    const tables = Object.keys(pgModels) as (keyof typeof pgModels)[];
    
    for (const tableName of tables) {
      console.log(`Copying ${tableName}...`);
      const pgData = await pgModels[tableName].findAll();
      if (pgData.length > 0) {
        await sqliteModels[tableName].bulkCreate(
          pgData.map(row => row.toJSON())
        );
        console.log(`✓ Copied ${pgData.length} rows to ${tableName}`);
      }
    }

    console.log('\n✓ Migration complete! SQLite database created at data/database.sqlite');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateToSQLite();
