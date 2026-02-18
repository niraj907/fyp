import { create } from 'zustand';
import axiosPrivate from '../utils/axiosPrivate';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosPrivate.post('/auth/login', { email, password });
      const { token, ...user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, token, isLoading: false });
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Signup
  signup: async (name, email, password, confirmPassword) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosPrivate.post('/auth/signup', { name, email, password, confirmPassword });
      const { token, ...user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, token, isLoading: false });
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));
