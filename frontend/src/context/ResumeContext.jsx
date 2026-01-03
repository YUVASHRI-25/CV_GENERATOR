import { createContext, useContext, useState, useEffect } from 'react'

// Initial empty resume state
const initialResumeData = {
  contact: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: ''
  },
  skills: [],
  education: [],
  internship: [],
  certificates: [],
  summary: ''
}

// Create Context
const ResumeContext = createContext()

// Auth Context for simple login state
const AuthContext = createContext()

// Resume Provider Component
export function ResumeProvider({ children }) {
  // Resume State
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData')
    return saved ? JSON.parse(saved) : initialResumeData
  })

  // Auth State (simple version)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token')
  })

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  // Update specific section of resume
  const updateResumeSection = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  // Update contact info
  const updateContact = (contactData) => {
    updateResumeSection('contact', { ...resumeData.contact, ...contactData })
  }

  // Add/Update skills
  const updateSkills = (skills) => {
    updateResumeSection('skills', skills)
  }

  // Add education entry
  const addEducation = (education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }))
  }

  // Update education entry
  const updateEducation = (index, education) => {
    const updated = [...resumeData.education]
    updated[index] = education
    updateResumeSection('education', updated)
  }

  // Remove education entry
  const removeEducation = (index) => {
    const updated = resumeData.education.filter((_, i) => i !== index)
    updateResumeSection('education', updated)
  }

  // Add internship entry
  const addInternship = (internship) => {
    setResumeData(prev => ({
      ...prev,
      internship: [...prev.internship, internship]
    }))
  }

  // Update internship entry
  const updateInternship = (index, internship) => {
    const updated = [...resumeData.internship]
    updated[index] = internship
    updateResumeSection('internship', updated)
  }

  // Remove internship entry
  const removeInternship = (index) => {
    const updated = resumeData.internship.filter((_, i) => i !== index)
    updateResumeSection('internship', updated)
  }

  // Add certificate
  const addCertificate = (certificate) => {
    setResumeData(prev => ({
      ...prev,
      certificates: [...prev.certificates, certificate]
    }))
  }

  // Remove certificate
  const removeCertificate = (index) => {
    const updated = resumeData.certificates.filter((_, i) => i !== index)
    updateResumeSection('certificates', updated)
  }

  // Update summary
  const updateSummary = (summary) => {
    updateResumeSection('summary', summary)
  }

  // Reset resume data
  const resetResume = () => {
    setResumeData(initialResumeData)
    localStorage.removeItem('resumeData')
  }

  // Auth functions
  const login = (userData, token) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const value = {
    // Resume data and functions
    resumeData,
    setResumeData,
    updateResumeSection,
    updateContact,
    updateSkills,
    addEducation,
    updateEducation,
    removeEducation,
    addInternship,
    updateInternship,
    removeInternship,
    addCertificate,
    removeCertificate,
    updateSummary,
    resetResume,
    
    // Auth data and functions
    user,
    isAuthenticated,
    login,
    logout
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

// Custom hook to use resume context
export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

export default ResumeContext
