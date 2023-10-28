import axios from 'axios';

const BASE_URL = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

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

export const updatePlayDate = async (id, playdate) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/playdates/${id}`,
      playdate
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error updating playdates');
    }
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

export const joinRequest = async (id, request) => {
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

export const updateJoinRequest = async (id, requestId, request) => {
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

export const deleteJoinRequest = async (id, requestId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error deleting request');
  }
};

export const getJoinRequestById = async (id, requestId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching request');
  }
};

export const getPlayDateByIdFullDetails = async (id, requestId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/playdates/${id}/fullRequest/${requestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching playdate');
  }
};

export const approveJoinRequest = async (id, requestId, request) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}/approve`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error('Error approving request');
  }
};

export const rejectJoinRequest = async (id, requestId, request) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}/reject`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error('Error rejecting request');
  }
};

export const searchPlayDates = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/playdates/search/${searchTerm}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error searching playdates');
  }
};
