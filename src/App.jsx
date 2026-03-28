import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HistoryDashboard from './components/HistoryDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-emerald-50 text-gray-800 font-sans flex flex-col">
          <Navbar />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <HistoryDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <footer className="bg-emerald-800 py-6 text-center text-emerald-200">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} CropGuard AI. Developed for Crop Disease Detection.
            </p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
