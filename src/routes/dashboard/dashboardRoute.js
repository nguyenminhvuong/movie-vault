import express from 'express';

const router = express.Router();

// Dashboard home route
router.get('/dashboard', (req, res) => {
  res.render('dashboard/index', { title: 'Dashboard' });
});

export default router;