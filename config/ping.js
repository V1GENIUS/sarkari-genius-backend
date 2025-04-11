const cron = require('node-cron');
const axios = require('axios');

const URL = 'https://sarkari-genius.onrender.com'; // Replace with your backend URL

// Ping every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await axios.get(URL);
    console.log('Pinged successfully at', new Date().toLocaleString());
  } catch (error) {
    console.error('Error pinging:', error.message);
  }
});
