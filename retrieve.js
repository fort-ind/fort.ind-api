// retrieve.js
const axios = require('axios');

async function retrieveFile(url) {
  try {
    // Ensure the URL starts with http or https
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const response = await axios.get(url, {
      responseType: 'text' // Make sure we get raw text
    });

    return response.data; // Return the content
  } catch (error) {
    console.error('Error retrieving file:', error.message);
    throw new Error('Failed to retrieve file');
  }
}

module.exports = retrieveFile;
