import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const BASE = 'http://192.168.1.175:9120'; //'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

const UserServices = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  },
};

export const updateUsername = async (username, token) => {};

export const updateProfilePic = async (profilePic, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const formData = new FormData();
  formData.append('profile', {
    uri: profilePic,
    name: id,
    type: 'image/jpeg',
  });

  const response = await axios.post(
    `${BASE}/api/v1/users/profilePic`,
    formData,
    config
  );

  if (response.status !== 200) throw new Error('Error updating profile pic');

  return response.data;
};

export const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE}/api/v1/users/profile`, config);

  if (response.status !== 200) throw new Error('Error getting profile pic');

  return response.data;
};

export default UserServices;
