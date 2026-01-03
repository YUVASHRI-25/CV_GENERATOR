/**
 * Template Service
 * Handles ATS-friendly resume template formatting
 */

const atsTemplate = require('../templates/atsTemplate.json');

/**
 * Apply ATS template to resume data
 */
const applyTemplate = (resumeData) => {
  const formatted = {
    layout: atsTemplate.layout,
    styling: atsTemplate.styling,
    sections: []
  };

  // Process each section according to template order
  for (const sectionName of atsTemplate.sections) {
    const sectionData = formatSection(sectionName, resumeData);
    if (sectionData) {
      formatted.sections.push(sectionData);
    }
  }

  return formatted;
};

/**
 * Format individual section
 */
const formatSection = (sectionName, data) => {
  if (!data) return null;

  const sectionFormatters = {
    contact: formatContact,
    summary: formatSummary,
    skills: formatSkills,
    education: formatEducation,
    internship: formatInternship,
    certificates: formatCertificates,
    projects: formatProjects,
    languages: formatLanguages
  };

  const formatter = sectionFormatters[sectionName];
  if (formatter) {
    return formatter(data[sectionName] || data);
  }
  
  return null;
};

/**
 * Format contact section
 */
const formatContact = (contact) => {
  if (!contact) return null;

  return {
    type: 'contact',
    title: contact.name || 'Name Not Provided',
    jobTitle: contact.jobTitle || null,
    content: {
      name: contact.name,
      jobTitle: contact.jobTitle,
      email: contact.email,
      phone: contact.phone,
      linkedin: contact.linkedin || null,
      github: contact.github || null,
      location: contact.location || null
    },
    // ATS-friendly format: Name on top, contact info in one line
    displayFormat: `${contact.email || ''} | ${contact.phone || ''} ${contact.linkedin ? '| LinkedIn' : ''} ${contact.github ? '| GitHub' : ''}`
  };
};

/**
 * Format summary section
 */
const formatSummary = (summary) => {
  if (!summary) return null;

  return {
    type: 'summary',
    title: 'Professional Summary',
    content: summary,
    // Clean up for ATS
    atsContent: summary.replace(/[^\w\s.,;:-]/g, '')
  };
};

/**
 * Format skills section
 */
const formatSkills = (skills, formattedSkills) => {
  if (!skills || skills.length === 0) return null;

  // If categorized by LLM
  if (formattedSkills && typeof formattedSkills === 'object') {
    return {
      type: 'skills',
      title: 'Technical Skills',
      content: formattedSkills,
      // ATS format: comma-separated keywords
      atsContent: skills.join(', ')
    };
  }

  // Simple list format
  return {
    type: 'skills',
    title: 'Technical Skills',
    content: skills,
    atsContent: skills.join(', ')
  };
};

/**
 * Format education section
 */
const formatEducation = (education) => {
  if (!education || education.length === 0) return null;

  const formatted = education.map(edu => ({
    degree: edu.degree,
    institution: edu.college || edu.institution,
    year: edu.year,
    gpa: edu.gpa || null,
    coursework: edu.coursework || []
  }));

  return {
    type: 'education',
    title: 'Education',
    content: formatted
  };
};

/**
 * Format internship/experience section
 */
const formatInternship = (internships) => {
  if (!internships || internships.length === 0) return null;

  const formatted = internships.map(intern => ({
    title: intern.title || intern.role,
    company: intern.company,
    duration: intern.duration,
    description: intern.description,
    // Convert description to bullet points if not already
    bullets: formatBulletPoints(intern.description)
  }));

  return {
    type: 'experience',
    title: 'Internship Experience',
    content: formatted
  };
};

/**
 * Format certificates section
 */
const formatCertificates = (certificates) => {
  if (!certificates || certificates.length === 0) return null;

  const formatted = certificates.map(cert => ({
    name: cert.name || cert.title,
    issuer: cert.issuer || cert.organization,
    date: cert.date,
    credentialId: cert.credentialId || null
  }));

  return {
    type: 'certificates',
    title: 'Certifications',
    content: formatted
  };
};
/**
 * Format projects section for ATS compatibility
 */
const formatProjects = (projects) => {
  if (!projects || projects.length === 0) return null;

  const formatted = projects.map(project => {
    // Format project description as bullet points for better ATS parsing
    let description = project.description;
    if (description && typeof description === 'string') {
      // Convert newlines to bullet points
      description = description
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.trim().replace(/^[•\-*]?\s*/, ''))
        .map(line => `• ${line}`)
        .join('\n');
    }

    // Format technologies as comma-separated list
    let techList = project.technologies;
    if (Array.isArray(techList)) {
      techList = techList.join(', ');
    } else if (!techList) {
      techList = '';
    }

    return {
      name: project.name || 'Project',
      role: project.role || 'Developer', // Add role if available
      technologies: techList,
      duration: project.duration || '',
      description: description || '',
      link: project.link || null,
      // Add additional ATS-friendly fields
      skills: project.technologies || [],
      responsibilities: description ? description.split('\n').filter(Boolean) : [],
      achievements: project.achievements || []
    };
  });

  return {
    type: 'projects',
    title: 'Projects',
    content: formatted,
    // Add ATS metadata
    _ats: {
      sectionType: 'work_experience',
      isProject: true
    }
  };
};

/**
 * Format languages section
 */
const formatLanguages = (languages) => {
  if (!languages || languages.length === 0) return null;

  return {
    type: 'languages',
    title: 'Languages',
    content: languages.map(lang => ({
      name: lang.name,
      proficiency: lang.proficiency
    }))
  };
};

/**
 * Format custom sections
 */
const formatCustomSections = (customSections) => {
  if (!customSections || customSections.length === 0) return null;

  // Format each custom section to match the expected structure
  return customSections.map(section => ({
    type: 'custom',
    title: section.title,
    content: section.content
  }));
};

/**
 * 
/**
 * Convert text to ATS-friendly bullet points
 */
const formatBulletPoints = (text) => {
  if (!text) return [];

  // If already has bullet points or newlines
  if (text.includes('\n') || text.includes('•') || text.includes('-')) {
    return text
      .split(/[\n•-]/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  // Single paragraph - return as is
  return [text];
};

/**
 * Validate resume data against template requirements
 */
const validateResumeData = (data) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!data.contact?.name) {
    errors.push('Name is required');
  }
  if (!data.contact?.email) {
    errors.push('Email is required');
  }

  // Recommended fields
  if (!data.skills || data.skills.length === 0) {
    warnings.push('Adding skills is recommended');
  }
  if (!data.education || data.education.length === 0) {
    warnings.push('Adding education is recommended');
  }
  if (!data.summary) {
    warnings.push('A professional summary helps with ATS scoring');
  }

  return { errors, warnings, isValid: errors.length === 0 };
};

/**
 * Get template structure for frontend
 */
const getTemplateStructure = () => {
  return {
    ...atsTemplate,
    requiredFields: ['contact.name', 'contact.email'],
    recommendedFields: ['skills', 'education', 'summary']
  };
};

// Add formatProjects to the exports
module.exports = {
  applyTemplate,
  validateResumeData,
  getTemplateStructure,
  formatProjects
};
