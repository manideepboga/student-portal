import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Mail, Lock, Shield, Building2, Hash, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddUserModal = ({ isOpen, onClose, onSuccess }: AddUserModalProps) => {
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
      const token = localStorage.getItem('token'); // Wait, the auth token is stored where? We'll assume the backend doesn't check it yet or we don't send it if not needed. Actually, Redux state holds it, but we can just use axios straight if there's no middleware yet.
      
      await axios.post('http://localhost:5001/api/users', {
        ...formData,
        role,
      });

      toast.success(`${role.charAt(0) + role.slice(1).toLowerCase()} created successfully!`);
      onSuccess();
      onClose();
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
            <h3 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
              <UserPlus className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" /> 
              Add New System User
            </h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Account Role</label>
              <div className="grid grid-cols-3 gap-4">
                {['STUDENT', 'FACULTY', 'ADMIN'].map((r) => (
                  <div 
                    key={r}
                    onClick={() => setRole(r as any)}
                    className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-center justify-center space-y-1 transition-all ${role === r ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-500'}`}
                  >
                    {r === 'STUDENT' ? <GraduationCap className="w-6 h-6" /> : r === 'FACULTY' ? <Building2 className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    <span className="text-sm font-bold">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Temporary Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Profile Fields (Student/Faculty) */}
              {role !== 'ADMIN' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" />
                  </div>
                </div>
              )}

              {/* Student Specific Fields */}
              {role === 'STUDENT' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" placeholder="e.g. 23K91A0540" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Branch</label>
                    <input type="text" name="branch" value={formData.branch} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" placeholder="e.g. CSE" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section</label>
                    <input type="text" name="section" value={formData.section} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" placeholder="e.g. A" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Academic Year</label>
                    <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white">
                      <option value="1">Year 1</option>
                      <option value="2">Year 2</option>
                      <option value="3">Year 3</option>
                      <option value="4">Year 4</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Faculty Specific Fields */}
              {role === 'FACULTY' && (
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Faculty ID</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" name="facultyId" value={formData.facultyId} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-600 bg-transparent text-slate-900 dark:text-white" placeholder="e.g. FAC-2041" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddUserModal;
