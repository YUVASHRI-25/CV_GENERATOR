import { Navigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useResume()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
