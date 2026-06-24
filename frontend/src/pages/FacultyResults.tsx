import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { BookOpen, Users, Award, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const subjects = [
  'Web Technologies',
  'Computer Networks',
  'Data Science',
  'Artificial Intelligence'
];

const initialStudents = [
  { roll: '23K91A0540', name: 'Manideep Boga', internal: 22, external: 65 },
  { roll: '23K91A0541', name: 'Rahul Sharma', internal: 20, external: 58 },
  { roll: '23K91A0542', name: 'Priya Reddy', internal: 24, external: 70 },
  { roll: '23K91A0543', name: 'Karthik Kumar', internal: 21, external: 62 },
  { roll: '23K91A0544', name: 'Ananya Singh', internal: 23, external: 68 },
];

const FacultyResults = () => {
  const [selectedBranch, setSelectedBranch] = useState('CSE-A');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [students, setStudents] = useState(initialStudents);
  const [saved, setSaved] = useState(false);

  const handleScoreChange = (roll: string, field: 'internal' | 'external', value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setStudents(students.map(s => 
      s.roll === roll ? { ...s, [field]: numValue } : s
    ));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Results successfully saved', {
      description: `Saved marks for ${students.length} students in ${selectedSubject}`,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    });
    setTimeout(() => setSaved(false), 3000);
  };

  const calculateTotal = (internal: number, external: number) => internal + external;
  
  const calculateGrade = (total: number) => {
    if (total >= 90) return 'O';
    if (total >= 80) return 'A+';
    if (total >= 70) return 'A';
    if (total >= 60) return 'B+';
    if (total >= 50) return 'B';
    return 'F';
  };

  return (
    <DashboardLayout title="Results Entry">
      <div className="space-y-6">
        
        {/* Header Configurator */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Users className="w-4 h-4 mr-2" /> Class / Branch
              </label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="CSE-A">CSE - Section A (Year 4)</option>
                <option value="CSE-B">CSE - Section B (Year 4)</option>
                <option value="ECE-A">ECE - Section A (Year 4)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" /> Subject
              </label>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Entry Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Award className="w-6 h-6 mr-2 text-emerald-600" /> Enter Marks
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Updating results for <span className="font-semibold">{selectedSubject}</span> ({selectedBranch})
              </p>
            </div>
            <button 
              onClick={handleSave}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                saved 
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
              }`}
            >
              {saved ? <><CheckCircle2 className="w-5 h-5" /> <span>Saved</span></> : <><Save className="w-5 h-5" /> <span>Save Results</span></>}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 rounded-tl-xl">Student Details</th>
                  <th className="px-6 py-4 text-center">Internal (Max 25)</th>
                  <th className="px-6 py-4 text-center">External (Max 75)</th>
                  <th className="px-6 py-4 text-center">Total (100)</th>
                  <th className="px-6 py-4 rounded-tr-xl text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {students.map((student, idx) => {
                  const total = calculateTotal(student.internal, student.external);
                  const grade = calculateGrade(total);
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={student.roll} 
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            {student.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{student.name}</div>
                            <div className="text-xs text-slate-500">{student.roll}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          min="0" max="25"
                          value={student.internal === 0 ? '' : student.internal}
                          onChange={(e) => handleScoreChange(student.roll, 'internal', e.target.value)}
                          className="w-20 mx-auto block bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          min="0" max="75"
                          value={student.external === 0 ? '' : student.external}
                          onChange={(e) => handleScoreChange(student.roll, 'external', e.target.value)}
                          className="w-20 mx-auto block bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-lg text-slate-900 dark:text-white">
                        {total}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-sm font-bold rounded-lg ${
                          grade === 'O' ? 'bg-purple-100 text-purple-700' :
                          grade === 'A+' ? 'bg-emerald-100 text-emerald-700' :
                          grade === 'F' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {grade}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default FacultyResults;
