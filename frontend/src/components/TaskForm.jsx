import { useEffect, useState } from 'react';

const emptyTask = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: ''
};

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100';

const TaskForm = ({ task, onSubmit, onCancel, saving }) => {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    setForm(
      task
        ? {
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'pending',
            priority: task.priority || 'medium',
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
          }
        : emptyTask
    );
  }, [task]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submitForm} className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-slate-900/5 backdrop-blur space-y-4">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600">{task ? 'Editing' : 'New task'}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{task ? 'Update task details' : 'Capture a priority'}</h2>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Title</span>
        <input className={inputClass} name="title" placeholder="What needs to be done?" value={form.title} onChange={updateField} required />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
        <textarea className={inputClass} name="description" placeholder="Add helpful context..." rows="4" value={form.description} onChange={updateField} />
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Status</span>
          <select className={inputClass} name="status" value={form.status} onChange={updateField}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Priority</span>
          <select className={inputClass} name="priority" value={form.priority} onChange={updateField}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Due date</span>
          <input className={inputClass} type="date" name="dueDate" value={form.dueDate} onChange={updateField} />
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <button className="rounded-2xl bg-indigo-600 px-6 py-3 font-black text-white shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 hover:bg-indigo-500 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={saving}>
          {saving ? 'Saving...' : task ? 'Save changes' : 'Create task'}
        </button>
        {task && (
          <button type="button" className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-black text-slate-700 hover:bg-slate-50" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
