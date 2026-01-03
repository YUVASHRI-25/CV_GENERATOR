import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ResumeProvider } from './context/ResumeContext'

// Components
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import GetStarted from './pages/GetStarted'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/builder" 
                element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
  )
}

export default App
