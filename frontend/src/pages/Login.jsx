import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout eyebrow="Welcome back" title="Login to your workspace" subtitle="Pick up where you left off and keep your day moving with a clearer task list.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Email address</span>
          <input className={inputClass} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} required />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
          <input className={inputClass} name="password" type="password" placeholder="Enter your password" value={form.password} onChange={updateField} required />
        </label>

        <button className="group mt-2 w-full rounded-2xl bg-indigo-600 py-4 font-black text-white shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 hover:bg-indigo-500 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
          <span className="ml-2 inline-block group-hover:translate-x-1">→</span>
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        New here? <Link className="font-black text-indigo-600 hover:text-indigo-500" to="/signup">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
