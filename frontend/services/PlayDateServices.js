import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const PlayDateServices = {
  getPlayDates: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/playdates`);
      return response.data;
    } catch (error) {
      throw new Error('Error festching playdates');
    }
  },
  getPlayDateById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/playdates/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching playdate');
    }
  },
  getPlayDatesByUser: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/playdates/user/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching playdates');
    }
  },
  createPlayDate: async (playdate) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/playdates`,
        playdate
      );
      return response.data;
    } catch (error) {
      throw new Error('Error creating playdate');
    }
  },
  updatePlayDate: async (playdate) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/playdates/${playdate._id}`,
        playdate
      );
      return response.data;
    } catch (error) {
      throw new Error('Error updating playdate');
    }
  },
  deletePlayDate: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/playdates/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting playdate');
    }
  },
  createRequest: async (id, request) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/playdates/${id}/request`,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error('Error creating request');
    }
  },
  updateRequest: async (id, requestId, request) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error('Error updating request');
    }
  },
  deleteRequest: async (id, requestId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/playdates/${id}/request/${requestId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error deleting request');
    }
  }
};

export default PlayDateServices;
