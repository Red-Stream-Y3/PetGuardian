import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

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

export default UserServices;
