const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Home page - list all movies
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    
    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    
    res.render('public/index', {
      title: 'Movie Vault - Browse Movies',
      movies,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Search movies
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { cast: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } }
      ]
    }).sort({ rating: -1 });
    
    res.render('public/search', {
      title: 'Search Results',
      movies,
      query
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Movie detail page
router.get('/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('public/404', { 
        title: 'Movie Not Found' 
      });
    }
    
    res.render('public/movie-detail', {
      title: movie.title,
      movie
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Add review to movie
router.post('/movie/:id/review', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('public/404', { 
        title: 'Movie Not Found' 
      });
    }
    
    const review = {
      user: req.session.user.username,
      rating: parseInt(req.body.rating),
      comment: req.body.comment
    };
    
    movie.reviews.push(review);
    movie.calculateAverageRating();
    await movie.save();
    
    res.redirect(`/movie/${movie._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

// Browse by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre: genre }).sort({ rating: -1 });
    
    res.render('public/genre', {
      title: `${genre} Movies`,
      movies,
      genre
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('public/error', { 
      title: 'Error',
      error 
    });
  }
});

module.exports = router;
