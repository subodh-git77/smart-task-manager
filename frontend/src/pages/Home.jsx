import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { title: 'Smart priorities', text: 'Spot what matters first with clear visual priority labels.' },
  { title: 'Focused dashboard', text: 'Keep pending, completed and due tasks organized in one place.' },
  { title: 'Private by default', text: 'Every task is tied to your account and protected by JWT auth.' }
];

const previewTasks = [
  { title: 'Prepare launch checklist', priority: 'High', status: 'Pending' },
  { title: 'Review design feedback', priority: 'Medium', status: 'In progress' },
  { title: 'Send weekly update', priority: 'Low', status: 'Completed' }
];

const Home = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-900/20">S</span>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">Smart Task</p>
            <p className="-mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">Manager</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <Link className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5" to="/dashboard">
              Open dashboard
            </Link>
          ) : (
            <>
              <Link className="hidden rounded-full px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-white/70 sm:inline-flex" to="/login">
                Login
              </Link>
              <Link className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5" to="/signup">
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24 lg:pt-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Plan, prioritize and finish with less friction
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            A cleaner way to turn busy days into clear action.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Smart Task Manager gives you a polished workspace for daily priorities, deadlines and progress without the clutter of heavyweight project tools.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="rounded-2xl bg-indigo-600 px-7 py-4 text-center text-sm font-black text-white shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 hover:bg-indigo-500" to={user ? '/dashboard' : '/signup'}>
              Start organizing
            </Link>
            <Link className="rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 text-center text-sm font-black text-slate-800 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:bg-white" to={user ? '/dashboard' : '/login'}>
              {user ? 'View dashboard' : 'I already have an account'}
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/80 bg-white/65 p-5 shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <p className="font-black text-slate-950">{feature.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-16 h-28 w-28 rounded-full bg-indigo-400/30 blur-2xl" />
          <div className="absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-pink-400/30 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Today</p>
                  <h2 className="text-2xl font-black">Priority board</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-100">Live preview</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Metric label="Tasks" value="12" />
                <Metric label="Done" value="7" />
                <Metric label="Due" value="3" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {previewTasks.map((task) => (
                <div key={task.title} className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className={`h-11 w-2 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <div>
                      <p className="font-black text-slate-900">{task.title}</p>
                      <p className="text-sm text-slate-500">{task.status}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700">{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Metric = ({ label, value }) => (
  <div className="rounded-2xl bg-white/10 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 text-2xl font-black">{value}</p>
  </div>
);

export default Home;
