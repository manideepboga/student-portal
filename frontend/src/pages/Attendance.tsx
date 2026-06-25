import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Calendar, Clock, Users, CheckCircle, XCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const periods = [
  { id: 1, time: '09:40 AM - 10:40 AM', label: 'Period 1' },
  { id: 2, time: '10:40 AM - 11:40 AM', label: 'Period 2' },
  { id: 3, time: '11:40 AM - 12:40 PM', label: 'Period 3' },
  { id: 4, time: '01:20 PM - 02:20 PM', label: 'Period 4' },
  { id: 5, time: '02:20 PM - 03:20 PM', label: 'Period 5' },
  { id: 6, time: '03:20 PM - 04:20 PM', label: 'Period 6' },
];

const studentsList = [
  { roll: '23K91A0540', name: 'Manideep Boga' },
  { roll: '23K91A0541', name: 'Rahul Sharma' },
  { roll: '23K91A0542', name: 'Priya Reddy' },
  { roll: '23K91A0543', name: 'Karthik Kumar' },
  { roll: '23K91A0544', name: 'Ananya Singh' },
];

const Attendance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].id);
  const [selectedBranch, setSelectedBranch] = useState('CSE-A');
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    studentsList.reduce((acc, s) => ({ ...acc, [s.roll]: true }), {})
  );

  const toggleAttendance = (roll: string) => {
    setAttendance((prev) => ({ ...prev, [roll]: !prev[roll] }));
  };

  const markAll = (status: boolean) => {
    setAttendance(studentsList.reduce((acc, s) => ({ ...acc, [s.roll]: status }), {}));
  };

  const handleSave = () => {
    toast.success('Attendance submitted successfully', {
      description: `Recorded attendance for ${studentsList.length} students in ${selectedBranch}`,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    });
  };

  return (
    <DashboardLayout title="Mark Attendance">
      <div className="space-y-6">
        
        {/* Header Configurator */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Users className="w-4 h-4 mr-2" /> Class / Branch
              </label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="CSE-A">CSE - Section A (Year 4)</option>
                <option value="CSE-B">CSE - Section B (Year 4)</option>
                <option value="ECE-A">ECE - Section A (Year 4)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Timetable Period
              </label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {periods.map(p => (
                  <option key={p.id} value={p.id}>{p.label} ({p.time})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Date
              </label>
              <input 
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Student Roster</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Mark present or absent for {selectedBranch}</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => markAll(true)}
                className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                Mark All Present
              </button>
              <button 
                onClick={() => markAll(false)}
                className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {studentsList.map((student, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={student.roll} 
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                    attendance[student.roll] 
                    ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30' 
                    : 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      attendance[student.roll] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {student.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{student.name}</h4>
                      <p className="text-slate-500 font-medium text-sm">{student.roll}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleAttendance(student.roll)}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                      attendance[student.roll]
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                      : 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20'
                    }`}
                  >
                    {attendance[student.roll] ? (
                      <>
                        <CheckCircle className="w-5 h-5" /> <span>Present</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" /> <span>Absent</span>
                      </>
                    )}
                  </button>
                </motion.tr>
              ))}
            </tbody>
          </div>

          <div className="mt-8 flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-sm shadow-indigo-600/20 transition-colors text-lg"
            >
              Save Attendance Record
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Attendance;
