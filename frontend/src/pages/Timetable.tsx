import DashboardLayout from '../layouts/DashboardLayout';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Timetable = () => {
  const timetable = [
    { time: '09:40 AM - 10:40 AM', monday: 'Web Technologies', tuesday: 'Computer Networks', wednesday: 'AI & ML', thursday: 'Data Science', friday: 'Web Technologies' },
    { time: '10:40 AM - 11:40 AM', monday: 'Data Science', tuesday: 'Web Technologies', wednesday: 'Computer Networks', thursday: 'AI & ML', friday: 'Computer Networks' },
    { time: '11:40 AM - 12:40 PM', monday: 'AI & ML', tuesday: 'Data Science', wednesday: 'Web Technologies', thursday: 'Computer Networks', friday: 'Data Science' },
    { time: '12:40 PM - 01:20 PM', monday: 'LUNCH BREAK', tuesday: 'LUNCH BREAK', wednesday: 'LUNCH BREAK', thursday: 'LUNCH BREAK', friday: 'LUNCH BREAK' },
    { time: '01:20 PM - 02:20 PM', monday: 'Web Tech Lab', tuesday: 'AI & ML Lab', wednesday: 'Sports / Library', thursday: 'Data Science Lab', friday: 'Project Work' },
    { time: '02:20 PM - 03:20 PM', monday: 'Project Work', tuesday: 'Seminar', wednesday: 'Web Tech Lab', thursday: 'Data Science Lab', friday: 'AI & ML Lab' },
    { time: '03:20 PM - 04:20 PM', monday: 'Library', tuesday: 'Sports', wednesday: 'Seminar', thursday: 'Project Work', friday: 'Web Tech Lab' },
  ];

  return (
    <DashboardLayout title="Weekly Timetable">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold flex items-center text-slate-800 dark:text-white">
            <Calendar className="w-8 h-8 mr-3 text-indigo-600" /> Semester 6 Schedule
          </h3>
          <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold rounded-full">
            CSE-A
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-base text-left">
            <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-5 rounded-tl-xl">Time</th>
                <th className="px-6 py-5">Monday</th>
                <th className="px-6 py-5">Tuesday</th>
                <th className="px-6 py-5">Wednesday</th>
                <th className="px-6 py-5">Thursday</th>
                <th className="px-6 py-5 rounded-tr-xl">Friday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {timetable.map((row, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">{row.time}</td>
                  <td className="px-6 py-6"><span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">{row.monday}</span></td>
                  <td className="px-6 py-6"><span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium">{row.tuesday}</span></td>
                  <td className="px-6 py-6"><span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">{row.wednesday}</span></td>
                  <td className="px-6 py-6"><span className="px-3 py-1.5 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg font-medium">{row.thursday}</span></td>
                  <td className="px-6 py-6"><span className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-medium">{row.friday}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Timetable;
