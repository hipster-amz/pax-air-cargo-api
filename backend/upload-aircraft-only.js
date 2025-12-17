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
    console.error(`✗ Error uploading ${dataType}:`, error.response?.data || error.message);
    return false;
  }
};

uploadFile('aircraft_costs', './sample-aircraft_costs.csv');