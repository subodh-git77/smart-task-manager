import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, eyebrow, children }) => (
  <main className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
    <section className="hidden bg-slate-950 px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between">
      <Link to="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-slate-950">S</span>
        <div>
          <p className="text-lg font-black tracking-tight">Smart Task</p>
          <p className="-mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">Manager</p>
        </div>
      </Link>

      <div className="relative z-10 max-w-xl">
        <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100">Built for focused days</div>
        <h1 className="text-6xl font-black leading-none tracking-tight">Plan less. Finish more.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          A fast, private task workspace with priorities, due dates and progress tracking built into a clean full-stack app.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['JWT auth', 'MongoDB', 'Clean UI'].map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </section>

    <section className="relative flex items-center justify-center px-5 py-10">
      <div className="absolute right-10 top-16 h-32 w-32 rounded-full bg-indigo-400/30 blur-3xl" />
      <div className="absolute bottom-12 left-10 h-32 w-32 rounded-full bg-pink-400/30 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
        <Link to="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 font-black text-white">S</span>
          <span className="font-black text-slate-950">Smart Task Manager</span>
        </Link>

        <div className="mb-8">
          {eyebrow && <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-indigo-600">{eyebrow}</p>}
          <h1 className="text-4xl font-black tracking-tight text-slate-950">{title}</h1>
          <p className="mt-3 leading-7 text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  </main>
);

export default AuthLayout;
