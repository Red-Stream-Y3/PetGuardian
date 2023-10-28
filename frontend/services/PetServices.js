import axios from 'axios';

const BASE_URL = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

export const getPetsByUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/pets/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pets');
  }
};

export const getAllPets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/pets`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pets');
  }
};

export const getPetById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/pets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pet');
  }
};

export const createPet = async (pet) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/pets`, pet);
    return response.data;
  } catch (error) {
    throw new Error('Error creating pet');
  }
};

export const updatePet = async (pet) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/pets/${pet._id}`,
      pet
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating pet');
  }
};

export const deletePet = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/pets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting pet');
  }
};

export const uploadPetImage = async (id, images, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const date = new Date();
    const formData = new FormData();
    formData.append('images', {
      type: 'image/jpeg',
      name: `${index}${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}.jpeg`,
      uri: images,
    });

    const response = await axios.post(
      `${BASE_URL}/api/v1/pets/upload/${id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error uploading images');
  }
};
