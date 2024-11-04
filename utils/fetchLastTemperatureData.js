import axios from 'axios';

const handleError = error => {
  if (error.response) {
    throw new Error(
      `Server Error: ${error.response.status} - ${error.response.data}`
    );
  } else if (error.request) {
    throw new Error('Network Error: No response received');
  } else {
    throw new Error(`Error: ${error.message}`);
  }
};

export const fetchLastTemperatureData = async (lastDays, location) => {
  const url = location
    ? `https://temperaturedashboard-backend-nodejs.onrender.com/api/temperature/last?last=${lastDays}&location=${location}`
    : `https://temperaturedashboard-backend-nodejs.onrender.com/api/temperature/last?last=${lastDays}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
