import axios from 'axios';
import { cmsBaseURL } from './constants';

// Enable cookies on cross-origin requests
axios.defaults.withCredentials = true;

// Attach Authorization Bearer token from localStorage for iframe & cross-origin resilience
axios.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('calouros_admin_token') : null;
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

const API = {
  home: {
    get: () => {
      return axios.get(`${cmsBaseURL}/cms/home`).then((res) => res.data);
    },
  },
  schedule: {
    getActive: async () => {
      const response = await axios.get('/api/schedule/active');
      return response.data;
    },
    validate: async (events) => {
      const response = await axios.post('/api/admin/validate-schedule', { events });
      return response.data;
    },
    publish: async (events, notes) => {
      const response = await axios.post('/api/admin/schedule/publish', { events, notes });
      return response.data;
    },
    getRevisions: async () => {
      const response = await axios.get('/api/admin/schedule/revisions');
      return response.data;
    },
    rollback: async (id) => {
      const response = await axios.post(`/api/admin/schedule/rollback/${id}`);
      return response.data;
    },
  },
  admin: {
    inspectXlsx: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/admin/inspect-xlsx', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    parseXlsx: async (file, sheetName, apiKey) => {
      const formData = new FormData();
      formData.append('file', file);
      if (sheetName) formData.append('sheetName', sheetName);
      if (apiKey) formData.append('apiKey', apiKey);
      const response = await axios.post('/api/admin/parse-xlsx', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    getAllowlist: async () => {
      const response = await axios.get('/api/admin/allowlist');
      return response.data;
    },
    addAllowlist: async (email) => {
      const response = await axios.post('/api/admin/allowlist', { email });
      return response.data;
    },
    removeAllowlist: async (email) => {
      try {
        const response = await axios.post('/api/admin/allowlist/remove', { email });
        return response.data;
      } catch {
        const response = await axios.delete(`/api/admin/allowlist/${encodeURIComponent(email)}`);
        return response.data;
      }
    },
  },
  locations: {
    getAll: async () => {
      const response = await axios.get('/api/locations');
      return response.data;
    },
    save: async (location) => {
      const response = await axios.post('/api/admin/locations', location);
      return response.data;
    },
    delete: async (id) => {
      try {
        const response = await axios.post('/api/admin/locations/delete', { id });
        return response.data;
      } catch {
        const response = await axios.delete(`/api/admin/locations/${encodeURIComponent(id)}`);
        return response.data;
      }
    },
  },
  auth: {
    me: async () => {
      const response = await axios.get('/api/auth/me');
      return response.data;
    },
    googleLogin: async (data) => {
      const response = await axios.post('/api/auth/google-login', data);
      if (response.data?.token) {
        try {
          localStorage.setItem('calouros_admin_token', response.data.token);
        } catch {}
      }
      return response.data;
    },
    devLogin: async (email, name) => {
      const response = await axios.post('/api/auth/dev-login', { email, name });
      if (response.data?.token) {
        try {
          localStorage.setItem('calouros_admin_token', response.data.token);
        } catch {}
      }
      return response.data;
    },
    logout: async () => {
      try {
        localStorage.removeItem('calouros_admin_token');
      } catch {}
      const response = await axios.post('/api/auth/logout');
      return response.data;
    },
  },
};

export default API;
