/**
 * PDF Generator Utility
 * Generates ATS-friendly PDF resumes
 */

const PDFDocument = require('pdfkit');

/**
 * Generate PDF from formatted resume data
 */
const generatePDF = async (formattedResume) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 60,
          right: 60
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Apply styling from template
      const styling = formattedResume.styling || {};

      // Process each section
      for (const section of formattedResume.sections) {
        renderSection(doc, section, styling);
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Render individual section
 */
const renderSection = (doc, section, styling) => {
  switch (section.type) {
    case 'contact':
      renderContact(doc, section, styling);
      break;
    case 'summary':
      renderSummary(doc, section, styling);
      break;
    case 'skills':
      renderSkills(doc, section, styling);
      break;
    case 'education':
      renderEducation(doc, section, styling);
      break;
    case 'experience':
      renderExperience(doc, section, styling);
      break;
    case 'certificates':
      renderCertificates(doc, section, styling);
      break;
  }
};

/**
 * Render contact section (header)
 */
const renderContact = (doc, section, styling) => {
  const content = section.content;

  // Name - large and centered
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .text(content.name, { align: 'center' });

  doc.moveDown(0.3);

  // Contact info line
  const contactParts = [];
  if (content.email) contactParts.push(content.email);
  if (content.phone) contactParts.push(content.phone);
  if (content.linkedin) contactParts.push('LinkedIn');
  if (content.github) contactParts.push('GitHub');
  if (content.location) contactParts.push(content.location);

  doc.fontSize(10)
     .font('Helvetica')
     .text(contactParts.join(' | '), { align: 'center' });

  doc.moveDown(1);
  addSectionLine(doc);
};

/**
 * Render professional summary
 */
const renderSummary = (doc, section, styling) => {
  addSectionTitle(doc, section.title);

  doc.fontSize(11)
     .font('Helvetica')
     .text(section.content, {
       align: 'justify',
       lineGap: 2
     });

  doc.moveDown(0.8);
  addSectionLine(doc);
};

/**
 * Render skills section
 */
const renderSkills = (doc, section, styling) => {
  addSectionTitle(doc, section.title);

  const skills = Array.isArray(section.content) 
    ? section.content.join(', ')
    : section.atsContent || '';

  doc.fontSize(11)
     .font('Helvetica')
     .text(skills, { lineGap: 2 });

  doc.moveDown(0.8);
  addSectionLine(doc);
};

/**
 * Render education section
 */
const renderEducation = (doc, section, styling) => {
  addSectionTitle(doc, section.title);

  for (const edu of section.content) {
    // Degree and Institution
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(edu.degree, { continued: true })
       .font('Helvetica')
       .text(edu.institution ? ` - ${edu.institution}` : '');

    // Year and GPA
    const details = [];
    if (edu.year) details.push(edu.year);
    if (edu.gpa) details.push(`GPA: ${edu.gpa}`);
    
    if (details.length > 0) {
      doc.fontSize(10)
         .text(details.join(' | '));
    }

    // Coursework
    if (edu.coursework && edu.coursework.length > 0) {
      doc.fontSize(10)
         .text(`Relevant Coursework: ${edu.coursework.join(', ')}`);
    }

    doc.moveDown(0.3);
  }

  doc.moveDown(0.5);
  addSectionLine(doc);
};

/**
 * Render experience/internship section
 */
const renderExperience = (doc, section, styling) => {
  addSectionTitle(doc, section.title);

  for (const exp of section.content) {
    // Title and Company
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(exp.title, { continued: true })
       .font('Helvetica')
       .text(` at ${exp.company}`);

    // Duration
    if (exp.duration) {
      doc.fontSize(10)
         .text(exp.duration);
    }

    // Bullet points
    if (exp.bullets && exp.bullets.length > 0) {
      for (const bullet of exp.bullets) {
        doc.fontSize(10)
           .text(`• ${bullet}`, { indent: 10 });
      }
    }

    doc.moveDown(0.5);
  }

  addSectionLine(doc);
};

/**
 * Render certificates section
 */
const renderCertificates = (doc, section, styling) => {
  addSectionTitle(doc, section.title);

  for (const cert of section.content) {
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(cert.name, { continued: true })
       .font('Helvetica')
       .text(cert.issuer ? ` - ${cert.issuer}` : '');

    if (cert.date) {
      doc.fontSize(10)
         .text(cert.date);
    }

    doc.moveDown(0.3);
  }
};

/**
 * Add section title
 */
const addSectionTitle = (doc, title) => {
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text(title.toUpperCase());
  
  doc.moveDown(0.3);
};

/**
 * Add horizontal line
 */
const addSectionLine = (doc) => {
  const startX = doc.page.margins.left;
  const endX = doc.page.width - doc.page.margins.right;
  const y = doc.y;

  doc.moveTo(startX, y)
     .lineTo(endX, y)
     .strokeColor('#cccccc')
     .lineWidth(0.5)
     .stroke();

  doc.moveDown(0.8);
};

/**
 * Generate DOCX (placeholder)
 */
const generateDOCX = async (formattedResume) => {
  // In production, use docx library
  throw new Error('DOCX generation not implemented yet');
};

module.exports = {
  generatePDF,
  generateDOCX
};
