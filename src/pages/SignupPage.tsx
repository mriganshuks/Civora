/**
 * CIVORA Signup Page (Phase 2)
 * Real user registration with role assignment & Supabase profile provisioning.
 * Enforces security rule: Admin cannot be chosen via public registration.
 */

import React, { useState } from 'react';
import { ArrowRight, UserCheck, Shield, Building2, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SignupPage: React.FC = () => {
  const { navigate, signUp, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<'citizen' | 'contractor'>('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ward, setWard] = useState('Ward 24');
  const [locality, setLocality] = useState('Model Town');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await signUp({
      email,
      password,
      name,
      role: selectedRole,
      ward,
      locality,
      phone,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Failed to complete registration.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
            C
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-wider">
            CIVORA
          </span>
        </button>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          Create a CIVORA Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Participate in civic monitoring, contracting, or ward accountability.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xs rounded-xl border border-slate-200/90 sm:px-8 space-y-6">
          {/* Role selector tabs - Enforcing Citizen or Contractor only */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Select Registration Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedRole('citizen')}
                className={`py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                  selectedRole === 'citizen'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Citizen / Resident
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('contractor')}
                className={`py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                  selectedRole === 'contractor'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Contractor / Agency
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              * Government &amp; Executive Admin accounts require institutional clearance.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Full Name {selectedRole === 'contractor' ? '/ Firm Name' : ''}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={selectedRole === 'citizen' ? 'e.g. Jaswinder Kaur' : 'e.g. Apex Civil Works Ltd'}
                className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. resident@example.com"
                className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  {selectedRole === 'citizen' ? 'Ward Number' : 'License ID / GSTIN'}
                </label>
                <input
                  type="text"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  placeholder={selectedRole === 'citizen' ? 'e.g. Ward 24' : 'e.g. 03AAACX9921D1Z8'}
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Locality / City
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Model Town, Ludhiana"
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{loading ? 'Creating Profile...' : 'Complete Registration'}</span>
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
