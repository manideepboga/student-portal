import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Shield, Building2, Hash, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import DashboardLayout from '../../layouts/DashboardLayout';

const Users = () => {
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | 'ADMIN'>('STUDENT');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rollNumber: '',
    branch: '',
    section: '',
    academicYear: '1',
    facultyId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/users`, {
        ...formData,
        role,
      });

      toast.success(`${role.charAt(0) + role.slice(1).toLowerCase()} created successfully!`);
      // Reset form
      setFormData({
        email: '', password: '', firstName: '', lastName: '', rollNumber: '', branch: '', section: '', academicYear: '1', facultyId: ''
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Users">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-indigo-600" /> Add New User
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Create accounts for students, faculty, and administrators.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 floating-card max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Account Role</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['STUDENT', 'FACULTY', 'ADMIN'].map((r) => (
                <div 
                  key={r}
                  onClick={() => setRole(r as any)}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-all ${role === r ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-500'}`}
                >
                  {r === 'STUDENT' ? <GraduationCap className="w-8 h-8" /> : r === 'FACULTY' ? <Building2 className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                  <span className="text-base font-bold">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Temporary Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            {role !== 'ADMIN' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
                </div>
              </div>
            )}

            {role === 'STUDENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Roll Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" placeholder="e.g. 23K91A0540" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Branch</label>
                  <input type="text" name="branch" value={formData.branch} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" placeholder="e.g. CSE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Section</label>
                  <input type="text" name="section" value={formData.section} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" placeholder="e.g. A" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Academic Year</label>
                  <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white">
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
              </div>
            )}

            {role === 'FACULTY' && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Faculty ID</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" name="facultyId" value={formData.facultyId} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" placeholder="e.g. FAC-2041" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end pt-6 border-t border-slate-200 dark:border-slate-800">
            <button type="submit" disabled={loading} className="px-8 py-3 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Users;
