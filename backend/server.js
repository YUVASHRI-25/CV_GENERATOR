const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Resume Builder Backend running on port ${PORT}`);
  console.log(`📄 API Docs: http://localhost:${PORT}/api`);
});
