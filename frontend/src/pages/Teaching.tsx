import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Cpu, Microscope, Lightbulb, Code, Award } from 'lucide-react';

const Teaching = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 via-indigo-900/60 to-slate-50 dark:to-slate-900" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <Link to="/" className="inline-flex items-center text-indigo-300 hover:text-white font-medium mb-8 transition-colors backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 mb-6 tracking-tight drop-shadow-lg">
            Academics & Teaching
          </h1>
          <p className="text-xl md:text-2xl text-indigo-50 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Pioneering a modern pedagogical approach that bridges the gap between theoretical knowledge and practical industry application.
          </p>
        </div>
      </div>

      {/* Features Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-24">
        
        {/* Row 1 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700/50 group hover:border-indigo-500/30 transition-colors">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Experiential Learning</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              At TKRCET, education transcends the boundaries of traditional classrooms. We utilize a project-based learning model where students solve real-world engineering problems. From building autonomous robots to developing full-stack applications, hands-on experience is woven directly into the curriculum.
            </p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] group">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Engineering Lab" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <Microscope className="w-8 h-8 text-indigo-400 mb-3" />
              <h3 className="text-2xl font-bold text-white">R&D Labs</h3>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] group">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Faculty Teaching" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <Award className="w-8 h-8 text-indigo-300 mb-3" />
              <h3 className="text-2xl font-bold text-white">Elite Faculty</h3>
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700/50 group hover:border-indigo-500/30 transition-colors">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Industry-Aligned Curriculum</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our syllabus is continuously updated in collaboration with industry experts to keep pace with technological advancements. We focus heavily on emerging technologies like Artificial Intelligence, Machine Learning, Data Science, and IoT.
            </p>
            <div className="flex flex-wrap gap-3">
              {['AI & ML', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Robotics'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Teaching;
