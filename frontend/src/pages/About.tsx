import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Target, Eye, Users, Trophy, GraduationCap, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay scale-105 animate-slow-pan"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-50 dark:to-slate-900" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <Link to="/" className="inline-flex items-center text-blue-300 hover:text-white font-medium mb-8 transition-colors backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 mb-6 tracking-tight drop-shadow-lg">
            Legacy of Excellence
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Established in 2002, TKRCET has been at the forefront of engineering education, nurturing the innovators of tomorrow.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Founded", value: "2002", icon: Building2 },
            { label: "Campus Size", value: "20+ Acres", icon: MapPin },
            { label: "Students", value: "5,000+", icon: Users },
            { label: "Alumni", value: "25,000+", icon: GraduationCap }
          ].map((stat, i) => (
            <div key={i} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300">
              <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">
              <Trophy className="w-5 h-5" />
              <span>Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Shaping the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">technology & engineering.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              TKR College of Engineering and Technology (TKRCET) operates under the prestigious TKR Educational Society. Located in Meerpet, Hyderabad, our institution is proudly affiliated with Jawaharlal Nehru Technological University Hyderabad (JNTUH) and approved by AICTE, New Delhi.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We believe in holistic development. Beyond the rigorous academic curriculum, we focus heavily on character building, ethical values, and practical industry readiness, ensuring our graduates don't just find jobs, but become leaders.
            </p>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="University Graduation" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Eye className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Eye className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg text-blue-100 leading-relaxed font-light">
                To be a center of excellence in engineering and technology education by imparting high-quality instruction that blends academic rigor with ethical values. We strive to nurture technically competent graduates and promote leadership, research, and professionalism worldwide.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Target className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Target className="w-8 h-8 text-indigo-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <ul className="space-y-4 text-indigo-100 font-light text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2.5 mr-3 bg-indigo-400 rounded-full shrink-0" />
                  <span>Provide world-class scientific and technical education through premier infrastructure.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2.5 mr-3 bg-indigo-400 rounded-full shrink-0" />
                  <span>Establish the institute as a cutting-edge research center to enhance R&D scope.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2.5 mr-3 bg-indigo-400 rounded-full shrink-0" />
                  <span>Cultivate a dynamic learning environment that transforms students into responsible global citizens.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
