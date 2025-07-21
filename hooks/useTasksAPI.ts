import axios from 'axios';

export function useTasksAPI() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`, { headers });
    return res.data;
  };

  const createTask = async (task: { title: string; status: string; assignee?: string }) => {
    await axios.post(`${API_URL}/tasks`, task, { headers });
  };

  const updateTask = async (id: number, updates: any) => {
    await axios.put(`${API_URL}/tasks/${id}`, updates, { headers });
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/tasks/${id}`, { headers });
  };

  return {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
