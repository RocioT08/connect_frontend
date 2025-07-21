import { useState } from 'react';
import axios from 'axios';
import { useTasksAPI } from '../hooks/useTasksAPI';


export default function AddTaskForm({ onTaskCreated, onClose }: { onTaskCreated: () => void; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [assignee, setAssignee] = useState('');
  const { createTask } = useTasksAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title, status, assignee });

    setTitle('');
    setStatus('todo');
    onTaskCreated(); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <div>
      <label className="text-sm font-medium">Task Name<span className="text-red-500">*</span></label>
      <input
        type="text"
        placeholder="e.g. design landing page"
        className="w-full border rounded p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      </div>
      <div>
        <label className="text-sm font-medium">Status<span className="text-red-500">*</span></label>
        <select
          className="w-full border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Assignee</label>
        <select
          className="w-full border rounded p-2"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
        <option value="">Unassigned</option>
        <option value="John Doe">👤 John Doe</option>
        <option value="Jane Smith">👤 Jane Smith</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Task
      </button>

      <button type="button" onClick={onClose} className="border p-2 rounded">
        Cancel
      </button>
    </form>
  );
}