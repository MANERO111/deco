'use client';
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import axios from '@/lib/axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { name: string; [key: string]: unknown }) => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [isForgotMode, setIsForgotMode] = useState<boolean>(false);
  const [forgotSuccess, setForgotSuccess] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError('');
      setForgotSuccess('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.get('/sanctum/csrf-cookie');
      await new Promise(resolve => setTimeout(resolve, 300));
      await axios.post('/api/login', { email, password });
      const res = await axios.get('/api/user');

      if (onLoginSuccess) {
        onLoginSuccess(res.data);
      }
      onClose();
    } catch (err) {
      const apiError = err as ApiError;
      console.error('Login error:', err);
      setError(apiError.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.get('/sanctum/csrf-cookie');
      await new Promise(resolve => setTimeout(resolve, 300));
      await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });

      const userResponse = await axios.get('/api/user');
      if (onLoginSuccess) {
        onLoginSuccess(userResponse.data);
      }
      onClose();
    } catch (err) {
      const apiError = err as ApiError;
      console.error('Registration error:', err);
      setError(apiError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setForgotSuccess('');

    try {
      await axios.post('/api/forgot-password', { email });
      setForgotSuccess('A password reset link has been sent to your email.');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8DFD8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-[#2C2825] text-white px-8 pt-8 pb-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#FAF8F5]/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-[#E8DCC4] mb-3">
            <Sparkles className="w-3 h-3 text-[#C86D51]" />
            Deco Flower Casa Member
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
            {isForgotMode
              ? 'Reset Your Password'
              : isRegisterMode
              ? 'Join The Casa Circle'
              : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#D8CCC2] mt-1.5 font-light">
            {isForgotMode
              ? 'Enter your email to receive recovery instructions'
              : isRegisterMode
              ? 'Create an account to track orders & save curated favorites'
              : 'Access your orders, address book, and private wishlists'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {forgotSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              {forgotSuccess}
            </div>
          )}

          {isForgotMode ? (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Sending Instructions...' : 'Send Reset Link'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setError('');
                  }}
                  className="text-xs text-[#6B655F] hover:text-[#C86D51] transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          ) : isRegisterMode ? (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Astrid Lindgren"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <Lock className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B8777] hover:text-[#2C2825]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3 border-t border-[#F4EFEB]">
                <p className="text-xs text-[#6B655F]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(false);
                      setError('');
                    }}
                    className="font-semibold text-[#C86D51] hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(true);
                      setError('');
                    }}
                    className="text-xs text-[#9B8777] hover:text-[#C86D51] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFD8] focus:border-[#C86D51] rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-[#2C2825] placeholder-[#9B8777] outline-none transition-colors"
                  />
                  <Lock className="w-4 h-4 text-[#9B8777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B8777] hover:text-[#2C2825]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#2C2825] hover:bg-[#C86D51] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3 border-t border-[#F4EFEB]">
                <p className="text-xs text-[#6B655F]">
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(true);
                      setError('');
                    }}
                    className="font-semibold text-[#C86D51] hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;