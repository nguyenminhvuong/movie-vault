import express from 'express';
const router = express.Router();

// Dashboard login route
router.get('/dashboard/login', (req, res) => {
  res.render('dashboard/login', { title: 'Dashboard Login' });
});

export default router;