import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const PostServices = {
  getPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  },
  getPostsByUser: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts/user/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  },
  getPostById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching post');
    }
  },
  createPost: async (post) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/posts`, post);
      return response.data;
    } catch (error) {
      throw new Error('Error creating post');
    }
  },
  updatePost: async (post) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/posts/${post._id}`,
        post
      );
      return response.data;
    } catch (error) {
      throw new Error('Error updating post');
    }
  },
  deletePost: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting post');
    }
  },
};

export default PostServices;
