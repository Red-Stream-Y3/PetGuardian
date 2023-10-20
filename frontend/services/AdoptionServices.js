import axios from 'axios';

const BASE_URL = 'http://192.168.8.101:9120';

export const getAvailablePets = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/adoption/`);

  if (response.status !== 200) {
    throw new Error('Failed to fetch available pets');
  }

  return response.data;
};

export const getPetById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/adoption/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pet');
  }
};
export const getPetByOwner = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/adoption/owner/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pet');
  }
};
export const getDogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/adoption/dogs`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching dogs');
  }
};
export const getCats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/adoption/cats`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching cats');
  }
};
export const getOtherAnimals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/adoption/other`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching other animals');
  }
};
