import express from 'express';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// router.get('/index', (req, res, next) => {
//   res.render('index', { title: 'MVC' })
// })

export default router;