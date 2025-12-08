const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { isAdmin } = require('../middleware/auth');

// Apply admin middleware to all routes
router.use(isAdmin);

// Admin dashboard
router.get('/', async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const recentMovies = await Movie.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalMovies,
      recentMovies
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// List all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render('admin/movies', {
      title: 'Manage Movies',
      movies
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Show create movie form
router.get('/movies/new', (req, res) => {
  res.render('admin/movie-form', {
    title: 'Add New Movie',
    movie: {},
    action: '/admin/movies',
    method: 'POST'
  });
});

// Create new movie
router.post('/movies', async (req, res) => {
  try {
    const movieData = {
      title: req.body.title,
      director: req.body.director,
      year: parseInt(req.body.year),
      genre: req.body.genre.split(',').map(g => g.trim()),
      duration: parseInt(req.body.duration),
      description: req.body.description,
      cast: req.body.cast.split(',').map(c => c.trim()),
      poster: req.body.poster || '/images/default-poster.svg',
      trailer: req.body.trailer
    };
    
    const movie = new Movie(movieData);
    await movie.save();
    
    res.redirect('/admin/movies');
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Show edit movie form
router.get('/movies/:id/edit', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('public/404', { 
        title: 'Movie Not Found' 
      });
    }
    
    res.render('admin/movie-form', {
      title: 'Edit Movie',
      movie,
      action: `/admin/movies/${movie._id}?_method=PUT`,
      method: 'POST'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Update movie
router.put('/movies/:id', async (req, res) => {
  try {
    const movieData = {
      title: req.body.title,
      director: req.body.director,
      year: parseInt(req.body.year),
      genre: req.body.genre.split(',').map(g => g.trim()),
      duration: parseInt(req.body.duration),
      description: req.body.description,
      cast: req.body.cast.split(',').map(c => c.trim()),
      poster: req.body.poster,
      trailer: req.body.trailer
    };
    
    await Movie.findByIdAndUpdate(req.params.id, movieData);
    res.redirect('/admin/movies');
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Delete movie
router.delete('/movies/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/admin/movies');
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

module.exports = router;
