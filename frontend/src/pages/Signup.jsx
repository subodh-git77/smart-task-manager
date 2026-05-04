import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout eyebrow="Start free" title="Create your account" subtitle="Set up a secure workspace for tasks, priorities and deadlines in under a minute.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Name</span>
          <input className={inputClass} name="name" placeholder="Alex Morgan" value={form.name} onChange={updateField} required />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Email address</span>
          <input className={inputClass} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} required />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
          <input className={inputClass} name="password" type="password" placeholder="Choose a strong password" value={form.password} onChange={updateField} required minLength="6" />
        </label>

        <button className="group mt-2 w-full rounded-2xl bg-indigo-600 py-4 font-black text-white shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 hover:bg-indigo-500 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
          <span className="ml-2 inline-block group-hover:translate-x-1">→</span>
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already registered? <Link className="font-black text-indigo-600 hover:text-indigo-500" to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
