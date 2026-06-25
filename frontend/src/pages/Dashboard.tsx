import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users, GraduationCap, Calendar, Clock, BookOpen, User, Building2, Phone, Mail, Award, Activity, Server, Shield, Globe } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AddUserModal from '../components/AddUserModal';

const AnimatedCounter = ({ value, decimals = 0, duration = 2, prefix = '', suffix = '' }: { value: number, decimals?: number, duration?: number, prefix?: string, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          const formatted = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          ref.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      }
    });

    return () => controls.stop();
  }, [value, duration, decimals, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const performanceData = [
  { semester: 'Sem 1', sgpa: 8.2 },
  { semester: 'Sem 2', sgpa: 8.5 },
  { semester: 'Sem 3', sgpa: 7.9 },
  { semester: 'Sem 4', sgpa: 8.8 },
  { semester: 'Sem 5', sgpa: 8.6 },
];

const AnimatedAreaChart = ({ data }: { data: {semester: string, sgpa: number}[] }) => {
  const width = 600;
  const height = 180;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.sgpa / 10) * height;
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="relative w-full h-full pt-4">
      <svg viewBox={`-10 -10 ${width + 20} ${height + 40}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        {[0, 2.5, 5, 7.5, 10].map((val, i) => (
          <line 
            key={`grid-${i}`} 
            x1="0" y1={height - (val / 10) * height} 
            x2={width} y2={height - (val / 10) * height} 
            stroke="#e2e8f0" strokeDasharray="4 4" 
            className="dark:stroke-slate-700/50"
          />
        ))}

        <motion.path
          d={areaPath}
          fill="url(#chartGradient)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
        
        <motion.path
          d={linePath}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (d.sgpa / 10) * height;
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r="6"
                fill="#ffffff"
                stroke="#4f46e5"
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
                className="dark:fill-slate-800 dark:stroke-indigo-400"
              />
              <text x={x} y={height + 25} textAnchor="middle" fill="#94a3b8" fontSize="13" className="font-semibold">
                {d.semester}
              </text>
              <motion.text
                x={x} y={y - 15} textAnchor="middle" fill="#4f46e5" fontSize="14" className="font-bold dark:fill-indigo-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                {d.sgpa}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const StudentDashboard = ({ user }: { user: any }) => {
  const profile = user?.studentProfile;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden floating-card">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <GraduationCap className="w-48 h-48" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/30 shrink-0 shadow-2xl interactive-element">
            <span className="text-5xl font-bold text-white shadow-sm">
              {profile ? profile.firstName[0] : user?.email[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {profile ? `${profile.firstName} ${profile.lastName}` : 'Welcome, Student!'}
            </h2>
            <div className="flex flex-wrap gap-4 text-blue-100 font-medium mt-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 interactive-element">
                <User className="w-4 h-4" />
                <span>{profile?.rollNumber || 'Roll No Not Set'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 interactive-element">
                <Building2 className="w-4 h-4" />
                <span>{profile?.branch || 'Branch Not Set'} ({profile?.section || 'Section Not Set'})</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 interactive-element">
                <GraduationCap className="w-4 h-4" />
                <span>Year {profile?.academicYear || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
            <h3 className="text-lg font-bold mb-6 flex items-center text-slate-800 dark:text-white">
              <User className="w-5 h-5 mr-2 text-blue-600" /> Personal Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400 interactive-element p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <Mail className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">College Email</p>
                  <p className="text-sm truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400 interactive-element p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <Phone className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Phone</p>
                  <p className="text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 shadow-sm text-white floating-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Clock className="w-5 h-5 mr-2" /> Attendance
              </h3>
              <span className="text-4xl font-black">
                <AnimatedCounter value={85} duration={2.5} />%
              </span>
            </div>
            <div className="w-full bg-emerald-900/30 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-white h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm text-emerald-100 font-medium">You are eligible for upcoming examinations.</p>
          </div>
        </div>

        {/* Right Column: Performance Analytics */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full floating-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center text-slate-800 dark:text-white">
                <Award className="w-5 h-5 mr-2 text-indigo-600" /> Academic Performance
              </h3>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Current CGPA</p>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  <AnimatedCounter value={8.4} decimals={2} duration={2} />
                </p>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              <AnimatedAreaChart data={performanceData} />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Faculty Profile Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden floating-card">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')" }}
        />
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <BookOpen className="w-48 h-48" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shrink-0 shadow-2xl interactive-element">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Faculty Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Dr. Sarah Jenkins</h2>
            <p className="text-indigo-200 text-lg font-medium mb-4">Associate Professor, Department of CSE</p>
            <div className="flex flex-wrap gap-4 text-indigo-100 font-medium">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 interactive-element">
                <User className="w-4 h-4" />
                <span>ID: FAC-2041</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 interactive-element">
                <Building2 className="w-4 h-4" />
                <span>CSE Block - Room 304</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-lg floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><Users className="w-6 h-6" /></div>
            <span className="text-3xl font-black"><AnimatedCounter value={124} duration={2} /></span>
          </div>
          <p className="font-semibold text-blue-100">Total Students</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><Calendar className="w-6 h-6" /></div>
            <span className="text-3xl font-black"><AnimatedCounter value={4} duration={2} /></span>
          </div>
          <p className="font-semibold text-emerald-100">Classes Today</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-6 text-white shadow-lg floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><Clock className="w-6 h-6" /></div>
            <span className="text-3xl font-black"><AnimatedCounter value={2} duration={1.5} /></span>
          </div>
          <p className="font-semibold text-orange-100">Pending Approvals</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 text-white shadow-lg floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><BookOpen className="w-6 h-6" /></div>
            <span className="text-3xl font-black"><AnimatedCounter value={85} duration={2.5} />%</span>
          </div>
          <p className="font-semibold text-purple-100">Avg Attendance</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
        <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800 dark:text-white">
          <Calendar className="w-6 h-6 mr-3 text-indigo-600" /> Today's Teaching Schedule
        </h3>
        <div className="space-y-4">
          {[
            { time: '09:40 AM - 10:40 AM', subject: 'Web Technologies', class: 'CSE-A (Year 4)', room: 'Room 301' },
            { time: '11:40 AM - 12:40 PM', subject: 'Web Technologies', class: 'CSE-B (Year 4)', room: 'Room 302' },
            { time: '01:20 PM - 02:20 PM', subject: 'Web Tech Lab', class: 'CSE-A Lab', room: 'Lab 4' },
            { time: '03:20 PM - 04:20 PM', subject: 'Project Work Review', class: 'Group 1 & 2', room: 'Room 304' }
          ].map((schedule, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 interactive-element">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl font-bold">
                  {schedule.time.split(' ')[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{schedule.subject}</h4>
                  <p className="text-sm text-slate-500 font-medium">{schedule.class} • {schedule.room}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                Mark Attendance
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden floating-card">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute left-20 bottom-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold">System Administration</h2>
          </div>
          <p className="text-slate-400 text-lg">TKRCET Infrastructure & Portal Management</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl"><Users className="w-6 h-6" /></div>
            <span className="text-3xl font-black text-slate-800 dark:text-white"><AnimatedCounter value={5421} duration={2.5} /></span>
          </div>
          <p className="font-semibold text-slate-500">Active Users</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl"><Server className="w-6 h-6" /></div>
            <span className="text-3xl font-black text-slate-800 dark:text-white"><AnimatedCounter value={99.9} decimals={1} duration={2} />%</span>
          </div>
          <p className="font-semibold text-slate-500">Server Uptime</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl"><Globe className="w-6 h-6" /></div>
            <span className="text-3xl font-black text-slate-800 dark:text-white"><AnimatedCounter value={124} duration={3} />ms</span>
          </div>
          <p className="font-semibold text-slate-500">API Latency</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-2xl"><Activity className="w-6 h-6" /></div>
            <span className="text-3xl font-black text-slate-800 dark:text-white"><AnimatedCounter value={842} duration={2} /></span>
          </div>
          <p className="font-semibold text-slate-500">Requests / min</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 floating-card">
          <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800 dark:text-white">
            <Activity className="w-6 h-6 mr-3 text-blue-600" /> System Activity Log
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[
              { title: 'Database Backup Completed', time: '10 mins ago', type: 'success' },
              { title: 'New Faculty Account Created (FAC-2041)', time: '1 hour ago', type: 'info' },
              { title: 'High CPU Usage Detected (Node 3)', time: '3 hours ago', type: 'warning' },
              { title: 'Semester Results Published (CSE Year 4)', time: '5 hours ago', type: 'success' },
            ].map((log, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className={`w-3 h-3 rounded-full ${log.type === 'success' ? 'bg-emerald-500' : log.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shadow-sm interactive-element">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{log.title}</div>
                    <time className="font-mono text-xs text-slate-500">{log.time}</time>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 floating-card mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center text-slate-800 dark:text-white">
              <Users className="w-6 h-6 mr-3 text-indigo-600" /> User Management
            </h3>
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <User className="w-4 h-4 mr-2" /> Add New User
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500">
            <p>Click the "Add New User" button to seamlessly provision new accounts.</p>
          </div>
        </div>

      </div>
      
      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)} 
        onSuccess={() => {}}
      />
    </div>
  );
};

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout title="Dashboard">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-slate-500 dark:text-slate-400">Welcome to TKR College of Engineering and Technology Portal.</p>
      </motion.div>

      {user?.role === 'STUDENT' && <StudentDashboard user={user} />}
      {user?.role === 'FACULTY' && <FacultyDashboard />}
      {user?.role === 'ADMIN' && <AdminDashboard />}
      
    </DashboardLayout>
  );
};

export default Dashboard;
