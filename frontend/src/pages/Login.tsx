import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { GraduationCap, Lock, Mail, ChevronRight, Building2, MapPin } from 'lucide-react';
import axios from 'axios';

const Login = ({ type }: { type: 'student' | 'staff' | 'admin' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isStaff = type === 'staff';
  const isAdmin = type === 'admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/login`, {
        email,
        password,
      });

      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));

      switch (res.data.user.role) {
        case 'STUDENT': navigate('/student/dashboard'); break;
        case 'FACULTY': navigate('/faculty/dashboard'); break;
        case 'ADMIN': navigate('/admin/dashboard'); break;
        default: navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900 font-sans">
      
      {/* Left Pane - Branding & Image */}
      <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${isAdmin ? 'bg-emerald-900' : isStaff ? 'bg-indigo-900' : 'bg-blue-900'}`}>
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: isAdmin ? "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" : isStaff ? "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" : "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isAdmin ? 'from-emerald-950 via-emerald-900/80 to-emerald-900/40' : isStaff ? 'from-indigo-950 via-indigo-900/80 to-indigo-900/40' : 'from-blue-950 via-blue-900/80 to-blue-900/40'}`} />
        
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <GraduationCap className="w-10 h-10 text-blue-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TKRCET</h1>
              <p className="text-blue-200 text-sm font-medium tracking-wider uppercase">Portal System</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Empowering the next <br/> generation of engineers.
            </h2>
            <p className="text-lg text-blue-100 max-w-lg leading-relaxed">
              Welcome to the official portal of TKR College of Engineering and Technology. Access your academic records, attendance, and campus updates seamlessly.
            </p>
            
            <div className="pt-8 border-t border-blue-800/50 flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-blue-200">
                <Building2 className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">Affiliated to JNTUH & Approved by AICTE</p>
              </div>
              <div className="flex items-start space-x-3 text-blue-200">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">Survey No. 8/A, Medbowli, Meerpet, Hyderabad - 500097</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-900 relative">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${isAdmin ? 'bg-emerald-600 shadow-emerald-600/30' : isStaff ? 'bg-indigo-600 shadow-indigo-600/30' : 'bg-blue-600 shadow-blue-600/30'}`}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">TKRCET {isAdmin ? 'Admin' : isStaff ? 'Staff' : 'Student'} Portal</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Sign in to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{isAdmin ? 'Admin Login' : isStaff ? 'Staff Login' : 'Student Login'}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Please enter your {isAdmin ? 'admin credentials' : isStaff ? 'staff credentials' : 'student details'} to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-start space-x-2">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">College Email or ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your college email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${isAdmin ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600' : isStaff ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600'}`}
            >
              {loading ? 'Authenticating...' : 'Sign in'}
              {!loading && <ChevronRight className="ml-2 w-4 h-4" />}
            </button>
          </form>
          
          <div className="pt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              By signing in, you agree to the TKRCET Portal <br/>
              <a href="#" className="font-medium text-slate-900 dark:text-white hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-slate-900 dark:text-white hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
