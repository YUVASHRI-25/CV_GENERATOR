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
  switch (sectionName) {
    case 'contact':
      return formatContact(data.contact);
    case 'summary':
      return formatSummary(data.summary);
    case 'skills':
      return formatSkills(data.skills, data.formattedSkills);
    case 'education':
      return formatEducation(data.education);
    case 'projects':
      return formatProjects(data.projects);
    case 'internship':
      return formatInternship(data.internship);
    case 'certificates':
      return formatCertificates(data.certificates);
    case 'languages':
      return formatLanguages(data.languages);
    case 'custom':
      return formatCustomSections(data.customSections);
    default:
      return null;
  }
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
Format projects section
 */
const formatProjects = (projects) => {
  if (!projects || projects.length === 0) return null;

  const formatted = projects.map(project => ({
    name: project.name,
    technologies: project.technologies,
    duration: project.duration,
    description: project.description,
    link: project.link || null
  }));

  return {
    type: 'projects',
    title: 'Projects',
    content: formatted
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

  return {
    type: 'custom',
    sections: customSections.map(section => ({
      title: section.title,
      content: section.content
    }))
  };
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

module.exports = {
  applyTemplate,
  validateResumeData,
  getTemplateStructure
};
