import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Phone, MapPin, Building2, GraduationCap } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const profile = user?.studentProfile;

  return (
    <DashboardLayout title="Student Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <GraduationCap className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/30 shrink-0">
              <span className="text-5xl font-bold text-white shadow-sm">
                {profile ? profile.firstName[0] : user?.email[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {profile ? `${profile.firstName} ${profile.lastName}` : 'Welcome, Student!'}
              </h2>
              <div className="flex flex-wrap gap-4 text-blue-100 font-medium">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                  <User className="w-4 h-4" />
                  <span>{profile?.rollNumber || 'Roll No Not Set'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                  <Building2 className="w-4 h-4" />
                  <span>{profile?.branch || 'Branch Not Set'} ({profile?.section || 'Section Not Set'})</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                  <GraduationCap className="w-4 h-4" />
                  <span>Year {profile?.academicYear || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800 dark:text-white">
            <User className="w-6 h-6 mr-3 text-blue-600" /> Complete Profile Details
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-slate-600 dark:text-slate-400">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">College Email</p>
                  <p className="text-base">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-slate-600 dark:text-slate-400">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                  <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Phone</p>
                  <p className="text-base">+91 98765 43210</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-slate-600 dark:text-slate-400">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                  <p className="text-base">12-4-5/A, Dilsukhnagar, Hyderabad, Telangana - 500097</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;
