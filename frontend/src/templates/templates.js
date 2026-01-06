// Template definitions for the Resume Builder
// Each template defines layout, styling, and section configuration

export const TEMPLATES = {
  ats: {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Clean, simple layout optimized for Applicant Tracking Systems',
    preview: '📄',
    layout: 'single_column',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#1a1a1a',
      background: '#ffffff',
      headerBg: '#ffffff',
      headerText: '#000000'
    },
    fonts: {
      heading: "'Times New Roman', serif",
      body: "'Times New Roman', serif",
      nameSize: '22px',
      sectionTitleSize: '12px',
      bodySize: '11px'
    },
    sectionOrder: [
      'contact',
      'summary',
      'skills',
      'education',
      'projects',
      'internship',
      'certificates',
      'languages',
      'custom'
    ],
    sectionTitles: {
      summary: 'Professional Summary',
      skills: 'Technical Skills',
      education: 'Education',
      projects: 'Projects',
      internship: 'Internship Experience',
      certificates: 'Certifications',
      languages: 'Languages',
      custom: 'Additional Information'
    },
    features: {
      showSkillLevel: true,
      skillsDisplay: 'chips',
      contactLayout: 'centered',
      headerBorder: true,
      sectionBorder: true,
      compactMode: false
    }
  },
  
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Two-column layout with sidebar, perfect for creative professionals',
    preview: '🎨',
    layout: 'two_column',
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
      background: '#ffffff',
      headerBg: '#2c3e50',
      headerText: '#ffffff',
      sidebarBg: '#2c3e50',
      sidebarText: '#ffffff'
    },
    fonts: {
      heading: "'Segoe UI', Tahoma, sans-serif",
      body: "'Segoe UI', Tahoma, sans-serif",
      nameSize: '26px',
      sectionTitleSize: '14px',
      bodySize: '11px'
    },
    sidebarSections: ['contact', 'skills', 'languages', 'education'],
    mainSections: ['summary', 'internship', 'projects', 'certificates', 'custom'],
    sectionOrder: [
      'contact',
      'skills', 
      'languages',
      'education',
      'summary',
      'internship',
      'projects',
      'certificates',
      'custom'
    ],
    sectionTitles: {
      summary: 'About Me',
      skills: 'Skills',
      education: 'Education',
      projects: 'Projects',
      internship: 'Experience',
      certificates: 'Certifications',
      languages: 'Languages',
      custom: 'Additional'
    },
    features: {
      showSkillLevel: false,
      skillsDisplay: 'tags',
      contactLayout: 'sidebar',
      headerBorder: false,
      sectionBorder: false,
      compactMode: false,
      showIcons: true,
      languageProgress: true
    }
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimalist design with maximum whitespace',
    preview: '✨',
    layout: 'single_column',
    colors: {
      primary: '#1a1a1a',
      secondary: '#666666',
      accent: '#000000',
      background: '#ffffff',
      headerBg: '#ffffff',
      headerText: '#1a1a1a'
    },
    fonts: {
      heading: "'Helvetica Neue', Arial, sans-serif",
      body: "'Helvetica Neue', Arial, sans-serif",
      nameSize: '32px',
      sectionTitleSize: '11px',
      bodySize: '10px'
    },
    sectionOrder: [
      'contact',
      'summary',
      'internship',
      'projects',
      'education',
      'skills',
      'certificates',
      'languages',
      'custom'
    ],
    sectionTitles: {
      summary: 'PROFILE',
      skills: 'SKILLS',
      education: 'EDUCATION',
      projects: 'PROJECTS',
      internship: 'EXPERIENCE',
      certificates: 'CERTIFICATIONS',
      languages: 'LANGUAGES',
      custom: 'OTHER'
    },
    features: {
      showSkillLevel: false,
      skillsDisplay: 'inline',
      contactLayout: 'inline',
      headerBorder: false,
      sectionBorder: false,
      compactMode: true,
      uppercaseTitles: true
    }
  }
};

// Get template by ID
export const getTemplate = (templateId) => {
  return TEMPLATES[templateId] || TEMPLATES.ats;
};

// Get all templates as array
export const getTemplatesList = () => {
  return Object.values(TEMPLATES);
};

// Default template
export const DEFAULT_TEMPLATE = 'ats';

export default TEMPLATES;
