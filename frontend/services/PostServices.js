import axios from 'axios';

const BASE_URL = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

export const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/posts`, config);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

export const getPostById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/posts/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching post');
  }
};

export const createPost = async (post, images, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(`${BASE_URL}/api/v1/posts`, post, config);

    const date = new Date();
    const formData = new FormData();

    const uploadImages = (images) => {
      images.forEach((image, index) => {
        formData.append('images', {
          uri: image,
          name: `${
            res.data._id
          }_post_${index}${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.jpeg`,
          type: 'image/jpeg',
        });
      });
    };

    uploadImages(images);

    const response = await axios.post(
      `${BASE_URL}/api/v1/posts/upload/${res.data._id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error creating post');
  }
};

export const updatePost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/posts/${post._id}`,
      post,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating post');
  }
};

export const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/posts/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error deleting post');
  }
};

export const getPostByUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/posts/user/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

export const uploadImagesToPost = async (id, images, token) => {
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
      `${BASE_URL}/api/v1/posts/${id}/images`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error uploading images');
  }
};

export const searchPosts = async (searchTerm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/posts/search/${searchTerm}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error('Error searching posts');
  }
};
