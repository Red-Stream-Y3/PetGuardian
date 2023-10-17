import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const PetServices = {
    getPetsByUser: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/pets/user/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching pets');
        }
    },
    getPetById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/pets/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching pet');
        }
    },
    createPet: async (pet) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/pets`, pet);
            return response.data;
        } catch (error) {
            throw new Error('Error creating pet');
        }
    },
    updatePet: async (pet) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/v1/pets/${pet._id}`, pet);
            return response.data;
        } catch (error) {
            throw new Error('Error updating pet');
        }
    },
    deletePet: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/v1/pets/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error deleting pet');
        }
    },
};

export default PetServices;
