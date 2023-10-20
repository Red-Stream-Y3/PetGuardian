import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const BASE = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

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

export const updateUsername = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    username,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    body,
    config
  );

  if (response.status !== 200) throw new Error('Error updating username');

  return response.data;
};

export const updateFirstName = async (firstName, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    firstName,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    body,
    config
  );

  if (response.status !== 200) throw new Error('Error updating first name');

  return response.data;
};

export const updateLastName = async (lastName, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    lastName,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    body,
    config
  );

  if (response.status !== 200) throw new Error('Error updating last name');

  return response.data;
};

export const updateEmail = async (email, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    email,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    body,
    config
  );

  if (response.status !== 200) throw new Error('Error updating email');

  return response.data;
};

export const updatePhone = async (phone, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    phone,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    body,
    config
  );

  if (response.status !== 200) throw new Error('Error updating phone');

  return response.data;
};

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

export const updatePassword = async (
  email,
  oldPassword,
  newPassword,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //check of old password is correct
  const body = {
    email,
    password: oldPassword,
  };

  const check = await axios.post(`${BASE}/api/v1/users/login`, body, config);

  if (check.status !== 200) throw new Error('Current password is incorrect');

  //update password
  const updateBody = {
    password: newPassword,
  };

  const response = await axios.put(
    `${BASE}/api/v1/users/profile`,
    updateBody,
    config
  );

  if (response.status !== 200) throw new Error('Error updating password');

  return response.data;
};

export default UserServices;
