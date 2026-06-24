import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Award, BookOpen } from 'lucide-react';

const Results = () => {
  const results = [
    { subject: 'Web Technologies', internal: 22, external: 65, total: 87, grade: 'A+', status: 'Pass' },
    { subject: 'Computer Networks', internal: 20, external: 58, total: 78, grade: 'A', status: 'Pass' },
    { subject: 'Artificial Intelligence', internal: 24, external: 70, total: 94, grade: 'O', status: 'Pass' },
    { subject: 'Data Science', internal: 21, external: 62, total: 83, grade: 'A', status: 'Pass' },
  ];

  return (
    <DashboardLayout title="Academic Results">
      <div className="space-y-6">
        
        {/* Results Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Semester 5 Results</h2>
            <p className="text-emerald-100 text-lg">Your academic performance has been published.</p>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <span className="text-4xl font-black">8.55</span>
            <span className="text-sm font-medium uppercase tracking-wider text-emerald-100">SGPA</span>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 mr-3 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Subject-wise Breakdown</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 rounded-tl-xl">Subject</th>
                  <th className="px-6 py-4 text-center">Internal (25)</th>
                  <th className="px-6 py-4 text-center">External (75)</th>
                  <th className="px-6 py-4 text-center">Total (100)</th>
                  <th className="px-6 py-4 text-center">Grade</th>
                  <th className="px-6 py-4 rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {results.map((res, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-3 text-slate-400" />
                        <span className="font-semibold text-slate-900 dark:text-white">{res.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-700 dark:text-slate-300">{res.internal}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-700 dark:text-slate-300">{res.external}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white">{res.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 text-sm font-bold rounded-lg ${
                        res.grade === 'O' ? 'bg-purple-100 text-purple-700' :
                        res.grade === 'A+' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {res.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-semibold">
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Results;
