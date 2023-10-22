import axios from 'axios';

const BASE_URL = 'http://192.168.8.102:9120';

export const getAllPlayDates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/playdates`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching playdates');
  }
};

export const getPlayDateById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/playdates/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching playdate');
  }
};

export const createPlayDate = async (playdate) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/playdates`, playdate);
    return response.data;
  } catch (error) {
    throw new Error('Error creating playdate');
  }
};

export const updatePlayDate = async (playdate) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/playdates/${playdate._id}`,
      playdate
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating playdate');
  }
};

export const deletePlayDate = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/playdates/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting playdate');
  }
};

export const getPlayDatesByUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/playdates/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching playdates');
  }
};

export const createRequest = async (id, request) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/playdates/${id}/request`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error('Error creating request');
  }
};

export const updateRequest = async (id, requestId, request) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating request');
  }
};

export const deleteRequest = async (id, requestId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error deleting request');
  }
};
