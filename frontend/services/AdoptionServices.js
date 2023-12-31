import axios from 'axios';

const BASE_URL = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

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
    console.error('Error creating request:', error);
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
export const createRequestForAdoption = async (id, adoptRequest) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/adoption/request/${id}`,
      adoptRequest
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const postPetForAdoption = async (pet) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/adoption`, pet);
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const deletePetForAdoption = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/adoption/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const getRequesters = async (petId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/adoption/requesters/${petId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const approveAdoptionRequest = async (requestId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/adoption/approve/${requestId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const rejectAdoptionRequest = async (requestId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/adoption/reject/${requestId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const deleteAdoptionRequest = async (requestId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/adoption/deleteReq/${requestId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const getAdoptionRequestsByUser = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/adoption/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

export const updatePetForAdoption = async (petId, updatedPet) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/adoption/${petId}`,
      updatedPet
    );
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};
