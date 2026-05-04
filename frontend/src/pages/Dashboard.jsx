import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const query = statusFilter === 'all' ? '' : `?status=${statusFilter}`;
      setTasks(await api(`/tasks${query}`));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const highPriority = tasks.filter((task) => task.priority === 'high').length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      highPriority,
      progress: tasks.length ? Math.round((completed / tasks.length) * 100) : 0
    };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return tasks;

    return tasks.filter((task) => {
      return task.title.toLowerCase().includes(keyword) || task.description?.toLowerCase().includes(keyword) || task.priority.includes(keyword);
    });
  }, [tasks, searchTerm]);

  const saveTask = async (task) => {
    setSaving(true);
    setError('');

    try {
      await api(editingTask ? `/tasks/${editingTask._id}` : '/tasks', {
        method: editingTask ? 'PUT' : 'POST',
        body: JSON.stringify(task)
      });

      setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await api(`/tasks/${taskId}`, { method: 'DELETE' });
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTaskStatus = async (task) => {
    const status = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const updatedTask = await api(`/tasks/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });

      setTasks((currentTasks) => currentTasks.map((item) => (item._id === task._id ? updatedTask : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-900/20">S</span>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-950">Smart Task Manager</h1>
              <p className="-mt-1 text-xs font-semibold text-slate-500">Welcome back, {user?.name}</p>
            </div>
          </Link>
          <button onClick={logout} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[410px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-sm font-bold text-indigo-200">Workspace progress</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-5xl font-black tracking-tight">{stats.progress}%</p>
                <p className="mt-2 text-sm text-slate-400">{stats.completed} of {stats.total} tasks completed</p>
              </div>
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white/10 text-lg font-black">✓</div>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-indigo-400" style={{ width: `${stats.progress}%` }} />
            </div>
          </section>

          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="High" value={stats.highPriority} />
          </div>

          <TaskForm task={editingTask} onSubmit={saveTask} onCancel={() => setEditingTask(null)} saving={saving} />
        </aside>

        <section className="space-y-5">
          <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600">Dashboard</p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">Your tasks</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 sm:min-w-64"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="flex rounded-2xl bg-slate-100 p-1">
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      className={`rounded-xl px-4 py-2 text-sm font-black ${statusFilter === filter.value ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                      onClick={() => setStatusFilter(filter.value)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {error && <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}

          {loading && <EmptyState title="Loading tasks..." text="Your workspace is being prepared." loading />}
          {!loading && visibleTasks.length === 0 && (
            <EmptyState title="No tasks found" text={searchTerm ? 'Try a different search term or clear the filter.' : 'Create your first task to start organizing your day.'} />
          )}
          {!loading && visibleTasks.map((task) => <TaskCard key={task._id} task={task} onEdit={setEditingTask} onDelete={deleteTask} onToggle={toggleTaskStatus} />)}
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:shadow-lg">
    <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
  </div>
);

const EmptyState = ({ title, text, loading }) => (
  <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm backdrop-blur">
    {loading && <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />}
    <h3 className="text-xl font-black text-slate-950">{title}</h3>
    <p className="mt-2 text-slate-500">{text}</p>
  </div>
);

export default Dashboard;
