/**
 * Resume Routes
 */

const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// POST /api/resume/generate - Generate complete resume
router.post('/generate', resumeController.generateResume);

// POST /api/resume/preview - Preview resume without generating
router.post('/preview', resumeController.previewResume);

// POST /api/resume/enhance-summary - Enhance summary using LLM
router.post('/enhance-summary', resumeController.enhanceSummary);

// GET /api/resume/download/:id - Download generated resume
router.get('/download/:id', resumeController.downloadResume);

module.exports = router;
