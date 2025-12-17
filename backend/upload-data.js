const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const API_URL = 'http://localhost:3000/api/admin/upload';

const uploadFile = async (dataType, filePath) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    console.log(`Uploading ${dataType}...`);
    
    const response = await axios.post(`${API_URL}/${dataType}`, form, {
      headers: form.getHeaders(),
    });

    console.log(`✓ ${dataType} uploaded:`, response.data.message);
    return true;
  } catch (error) {
    console.error(`✗ Error uploading ${dataType}:`, error.message);
    return false;
  }
};

const uploadAllData = async () => {
  const uploads = [
    { type: 'airport_currency', file: './sample-airport_currency.csv' },
    { type: 'route_data', file: './sample-route_data.csv' },
    { type: 'aircraft_costs', file: './sample-aircraft_costs.csv' },
    { type: 'handling_rates', file: './sample-handling_rates.csv' },
    { type: 'market_benchmarks', file: './sample-market_benchmarks.csv' },
  ];

  console.log('Starting data upload...\n');

  for (const upload of uploads) {
    const success = await uploadFile(upload.type, upload.file);
    if (!success) {
      console.log(`Skipping subsequent uploads due to error with ${upload.type}`);
      break;
    }
    // Wait a second between uploads
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\nUpload complete!');
};

uploadAllData();