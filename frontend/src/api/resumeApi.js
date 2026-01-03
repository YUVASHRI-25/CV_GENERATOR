import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume'; // Update with your backend URL

export const saveResume = async (resumeData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, resumeData);
    return response.data;
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const generateResume = async (resumeData) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, resumeData);
    return response.data;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
};
