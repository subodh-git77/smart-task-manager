const priorityStyles = {
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  high: 'bg-rose-50 text-rose-700 ring-rose-100'
};

const priorityBars = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-500'
};

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No due date';
  const isCompleted = task.status === 'completed';

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
      <div className={`absolute left-0 top-0 h-full w-1.5 ${priorityBars[task.priority]}`} />

      <div className="flex items-start justify-between gap-4 pl-2">
        <button
          type="button"
          onClick={() => onToggle(task)}
          className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-transparent hover:border-indigo-500'}`}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-lg font-black ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-950'}`}>{task.title}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-black capitalize ring-1 ${priorityStyles[task.priority]}`}>{task.priority}</span>
          </div>
          <p className="mt-2 whitespace-pre-line leading-6 text-slate-500">{task.description || 'No description added yet.'}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pl-8 text-sm">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">Due {dueDate}</span>
          <span className={`rounded-full px-3 py-1 font-bold capitalize ${isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>{task.status}</span>
        </div>

        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-700 hover:bg-rose-100" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
