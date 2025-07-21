import { useState } from 'react';
import { useTasksAPI } from '../hooks/useTasksAPI';

export default function EditTaskForm({ task, onClose, onTaskUpdated }: any) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const { updateTask, deleteTask } = useTasksAPI();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(task.id, { title, status, assignee });
    onTaskUpdated();
    onClose();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    onTaskUpdated();
    onClose();
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-80">
      <h2 className="text-xl font-semibold">Edit Task</h2>
      <div>
        <label className="text-sm font-medium">Task Name<span className="text-red-500">*</span></label>
        <input
          type="text"
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
          required
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In-progress</option>
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

      <button type="submit" className="bg-blue-700 text-white p-2 rounded">
        Save Changes
      </button>

      <button type="button" onClick={handleDelete} className="bg-red-600 text-white p-2 rounded">
        Delete Task
      </button>

      <button type="button" onClick={onClose} className="border p-2 rounded">
        Cancel
      </button>
    </form>
  );
}