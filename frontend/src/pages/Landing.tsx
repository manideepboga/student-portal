import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, ChevronRight, Building2, Leaf } from 'lucide-react';

const Navbar = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between text-white border-b border-white/10 bg-blue-950/20 backdrop-blur-sm">
    <div className="flex items-center space-x-3">
      <GraduationCap className="w-8 h-8 text-blue-300" />
      <span className="text-xl font-bold tracking-tight">TKRCET</span>
    </div>
    <div className="hidden md:flex space-x-8 font-medium text-sm">
      <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
      <Link to="/about" className="hover:text-blue-300 transition-colors">About College</Link>
      <Link to="/teaching" className="hover:text-blue-300 transition-colors">Academics & Teaching</Link>
      <Link to="/environment" className="hover:text-blue-300 transition-colors">Campus Environment</Link>
    </div>
    <div className="flex space-x-3">
      <Link to="/login/student" className="px-3 md:px-4 py-2 text-sm font-semibold border border-white/20 hover:bg-white/10 rounded-lg transition-all">
        Student
      </Link>
      <Link to="/login/staff" className="px-3 md:px-4 py-2 text-sm font-semibold border border-white/20 hover:bg-white/10 rounded-lg transition-all">
        Staff
      </Link>
      <Link to="/login/admin" className="px-3 md:px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition-all">
        Admin
      </Link>
    </div>
  </nav>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-slate-900" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Excellence in <span className="text-blue-400">Engineering</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Welcome to TKR College of Engineering and Technology. We nurture technically competent professionals with a strong ethical foundation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/about" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center">
              Discover TKRCET <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/login/student" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold backdrop-blur-md transition-all">
              Student Login
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 -mt-32 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          <Link to="/about" className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700 group cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">About College</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Established in 2002, TKRCET is a premier institute approved by AICTE and affiliated to JNTUH. Learn about our rich history and mission.
            </p>
          </Link>

          <Link to="/teaching" className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700 group cursor-pointer">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">World-Class Teaching</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our highly qualified faculty employs modern pedagogical methods to ensure deep conceptual understanding and practical application.
            </p>
          </Link>

          <Link to="/environment" className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700 group cursor-pointer">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">Campus Environment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Spread across 20 acres, our lush green campus provides the perfect tranquil environment for learning, research, and recreation.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Landing;
