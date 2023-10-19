import axios from 'axios';

const BASE = 'http://192.168.1.175:9120'; //"https://pet-shop-backend-ukkxew3r5q-uc.a.run.app";

export const getServiceProviders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/v1/services`, config);

    if (response.status !== 200) {
        throw new Error('Failed to fetch service providers');
    }

    return response.data;
};

export const getServiceProviderById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/v1/services/${id}`, config);

    if (response.status !== 200) {
        throw new Error('Failed to fetch service provider');
    }

    return response.data[0];
};

export const getServiceRating = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE}/api/v1/ratings/${id}`, config);

    if (response.status !== 200) {
        throw new Error('Failed to fetch service provider');
    }

    return response.data[0];
};

export const updateServiceRating = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        `${BASE}/api/v1/ratings/user/${data.user}/${data.serviceProvider}`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to update service rating');
    }

    return response.data;
};

export const createServiceRating = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${BASE}/api/v1/ratings`, data, config);

    if (response.status !== 201) {
        throw new Error('Failed to create service rating');
    }

    return response.data;
};

export const getServiceRatingByUser = async (user, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/v1/ratings/user/${user}/${id}`,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to fetch service provider');
    }

    return response.data;
};

export const checkBookingTimeAvailability = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${BASE}/api/v1/services/hire/check`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to fetch service provider');
    }

    return response.data;
};

export const createServiceBooking = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${BASE}/api/v1/services/hire`,
        data,
        config
    );

    if (response.status !== 201) {
        throw new Error('Failed to create service booking');
    }

    return response.data;
};

export const getUserBookings = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/v1/services/hire/${id}`,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to fetch user bookings');
    }

    return response.data;
};

export const getBookingById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/v1/services/hire/getbyid/${id}`,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to fetch user bookings');
    }

    return response.data[0];
};

export const cancelBooking = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        `${BASE}/api/v1/services/hire`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to cancel booking');
    }

    return response.data;
};

export const createServiceProvider = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${BASE}/api/v1/services/create`,
        data,
        config
    );

    if (response.status !== 201) {
        throw new Error('Failed to create service provider');
    }

    return response.data;
};

export const getMyHireRequests = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    let response = await axios.get(
        `${BASE}/api/v1/services/myhire/${id}`,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to fetch service provider');
    }

    return response.data;
};

export const acceptHireRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = {
        _id: id,
        status: 'accepted',
    };

    let response = await axios.put(
        `${BASE}/api/v1/services/hire`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to accept hire request');
    }

    return response.data;
};

export const rejectHireRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = {
        _id: id,
        status: 'rejected',
    };

    let response = await axios.put(
        `${BASE}/api/v1/services/hire`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to reject hire request');
    }

    return response.data;
};

export const completeHireRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = {
        _id: id,
        status: 'completed',
    };

    let response = await axios.put(
        `${BASE}/api/v1/services/hire`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to complete hire request');
    }

    return response.data;
};

export const getPetsByUser = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/pets/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching pets');
    }
};

export const makePayment = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(
        `${BASE}/api/braintree/createPaymentTransaction`,
        data,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to make payment');
    }

    return response.data;
};

export const searchServiceProviders = async (searchTerm, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        `${BASE}/api/v1/services/search/${searchTerm}`,
        config
    );

    if (response.status !== 200) {
        throw new Error('Failed to search service providers');
    }

    return response.data;
};
