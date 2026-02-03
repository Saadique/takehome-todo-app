import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const api = {
  async fetchTodos() {
    const result = await axios.get(`${API_BASE}/api/todos`);
    return result.data;
  },

  async createTodo(payload) {
    const result = await axios.post(`${API_BASE}/api/todos`, payload);
    return result.data;
  },

  async updateTodo(id, payload) {
    const result = await axios.put(`${API_BASE}/api/todos/${id}`, payload);
    return result.data;
  },

  async toggleDone(id) {
    const result = await axios.patch(`${API_BASE}/api/todos/${id}/done`);
    return result.data;
  },

  async deleteTodo(id) {
    const result = await axios.delete(`${API_BASE}/api/todos/${id}`);
    return result.data;
  },
};
