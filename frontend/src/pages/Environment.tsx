import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Map, Coffee, BookMarked, Wifi, Dumbbell } from 'lucide-react';

const Environment = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-emerald-900/20" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center mt-20">
          <Link to="/" className="inline-flex items-center text-emerald-300 hover:text-white font-medium mb-8 transition-colors backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-400 mb-6 tracking-tight drop-shadow-lg">
            A Breathtaking Campus
          </h1>
          <p className="text-xl md:text-3xl text-emerald-50 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            20 acres of lush greenery dedicated to learning, innovation, and self-discovery.
          </p>
        </div>
      </div>

      {/* Main Content Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Discover TKRCET Campus</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our infrastructure is designed to provide a holistic environment that balances intense academics with recreation and tranquility.
          </p>
        </div>

        {/* Masonry Layout Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Feature Item */}
          <div className="md:col-span-8 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Central Library" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl inline-block mb-4">
                <BookMarked className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Central Library</h3>
              <p className="text-emerald-100 max-w-md line-clamp-2">A multi-storied automated library housing over 50,000 volumes, international journals, and a massive digital repository.</p>
            </div>
          </div>

          {/* Medium Feature Item */}
          <div className="md:col-span-4 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Sports Complex" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl inline-block mb-4">
                <Dumbbell className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Sports Arena</h3>
              <p className="text-emerald-100 text-sm">Extensive facilities for basketball, cricket, volleyball, and an indoor stadium.</p>
            </div>
          </div>

          {/* Small Feature Grid */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform">
              <Leaf className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Eco-Friendly Campus</h3>
              <p className="text-slate-600 dark:text-slate-400">Solar-powered buildings, extensive rainwater harvesting, and hundreds of trees making it a true green campus.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform">
              <Wifi className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Fully Wi-Fi Enabled</h3>
              <p className="text-slate-600 dark:text-slate-400">Seamless high-speed internet connectivity across all classrooms, labs, and open seating areas.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform">
              <Coffee className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Cafeteria & Hubs</h3>
              <p className="text-slate-600 dark:text-slate-400">A sprawling modern cafeteria serving hygienic, multi-cuisine food, acting as the primary social hub for students.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Environment;
