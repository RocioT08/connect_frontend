import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import AddTaskForm from '../components/AddTask';
import EditTaskForm from '../components/EditTask';
import { useTasksAPI } from '../hooks/useTasksAPI';

interface Task {
  id: number;
  title: string;
  status: string;
  assignee?: string;
}

export default function Dashboard() {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const assigneeImages = {
    "John Doe": "./avatars/john-doe.png",
    "Jane Smith": "./avatars/jane-smith.png",
  };
  const { fetchTasks } = useTasksAPI();

useEffect(() => {
  const load = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };
  load();
}, []);

  const getStatusBadge = (status: string) => {
    const colors: any = {
      todo: 'bg-gray-100 text-gray-700',
      inprogress: 'bg-orange-100 text-orange-700',
      done: 'bg-green-100 text-green-700',
    };
    return <span className={`px-2 py-1 text-sm rounded ${colors[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const filteredTasks = filteredStatus
    ? tasks.filter((task) => task.status === filteredStatus)
    : tasks;



  return (
    <div className="p-8 max-w-4xl mx-auto mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Task List</h1>
        <button
  className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
  onClick={() => setIsAddModalOpen(true)}>
  + Task
</button>


<Modal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  title="Add a new task"
>
<AddTaskForm
  onTaskCreated={async () => {
    const data = await fetchTasks();
    setTasks(data);
    setIsAddModalOpen(false);
  }}
  onClose={() => setIsAddModalOpen(false)}
/>
</Modal>

      </div>

      <div className="flex  mb-4">
        {['todo', 'inprogress', 'done'].map((status) => (
          <button
            key={status}
            className={`px-4 py-1 border rounded ${filteredStatus === status ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
            onClick={() => setFilteredStatus(status === filteredStatus ? null : status)}
          >
            {status === 'todo' ? 'To do' : status === 'inprogress' ? 'In-progress' : 'Done'}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Task</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assignee</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4">{getStatusBadge(task.status)}</td>
                <td className="px-6 py-4 text-gray-700">
  {task.assignee && assigneeImages[task.assignee] ? (
    <div className="flex items-center gap-2">
      <img
        src={assigneeImages[task.assignee]}
        alt={task.assignee}
        className="w-8 h-8 rounded-full"
      />
      <span>{task.assignee}</span>
    </div>
  ) : (
    'Unassigned'
  )}
</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setEditingTask(task)}>
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  <Modal
  isOpen={!!editingTask}
  onClose={() => setEditingTask(null)}
>
  {editingTask && (
    <EditTaskForm
      task={editingTask}
      onClose={() => setEditingTask(null)}
      onTaskUpdated={async () => {
        const data = await fetchTasks();
        setTasks(data);
      }}
    />
  )}
</Modal>
    </div>
  );
}