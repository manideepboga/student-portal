import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Teaching from './pages/Teaching';
import Environment from './pages/Environment';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import FacultyResults from './pages/FacultyResults';
import Users from './pages/admin/Users';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans antialiased">
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/environment" element={<Environment />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Navigate to="/login/student" replace />} />
          <Route path="/login/student" element={<Login type="student" />} />
          <Route path="/login/staff" element={<Login type="staff" />} />
          <Route path="/login/admin" element={<Login type="admin" />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Faculty Routes */}
          <Route path="/faculty/*" element={
            <ProtectedRoute allowedRoles={['FACULTY']}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="results" element={<FacultyResults />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="results" element={<Results />} />
                <Route path="timetable" element={<Timetable />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
