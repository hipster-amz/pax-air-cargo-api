const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Read the SQL dump
const sqlFile = process.argv[2] || 'pax_air_cargo_2025-12-16_194933.sql';
const dbFile = path.join(__dirname, 'data', 'database.sqlite');

console.log(`Reading SQL dump: ${sqlFile}`);
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Parse SQL content - extract INSERT statements
const insertMatches = sqlContent.match(/INSERT INTO [^;]+;/g) || [];
console.log(`Found ${insertMatches.length} INSERT statements`);

// Connect to SQLite database
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('✓ Connected to SQLite database');

  // Convert PostgreSQL INSERT syntax to SQLite
  const convertedInserts = insertMatches.map(stmt => {
    // Remove PostgreSQL NUMERIC casts and convert to SQLite syntax
    let converted = stmt
      .replace(/numeric\(\d+,\d+\)/g, '')
      .replace(/character varying\(\d+\)/g, '')
      .replace(/timestamp with time zone/g, '')
      .replace(/CAST\([^)]+\s+AS\s+[^)]+\)/g, (match) => {
        // Extract just the value from CAST
        const valueMatch = match.match(/CAST\(([^\s]+)/);
        return valueMatch ? valueMatch[1] : match;
      });
    
    return converted;
  });

  // Execute inserts
  let count = 0;
  db.serialize(() => {
    convertedInserts.forEach((stmt, index) => {
      db.run(stmt, (err) => {
        if (err) {
          console.error(`Error executing statement ${index + 1}:`, err.message);
          console.error(`Statement: ${stmt.substring(0, 100)}...`);
        } else {
          count++;
          if ((count + 1) % 10 === 0) {
            console.log(`✓ Inserted ${count} records...`);
          }
        }
      });
    });

    // After all statements, close database
    setTimeout(() => {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
        }
        console.log(`\n✓ Import complete! Inserted ${count} records into ${dbFile}`);
        process.exit(0);
      });
    }, 5000);
  });
});

db.on('error', (err) => {
  console.error('Database error:', err);
  process.exit(1);
});
