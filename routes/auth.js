const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Show login form
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/login', { 
    title: 'Login',
    error: null 
  });
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Invalid username or password'
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Invalid username or password'
      });
    }
    
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    req.session.isAdmin = user.isAdmin;
    
    if (user.isAdmin) {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('auth/login', {
      title: 'Login',
      error: 'An error occurred. Please try again.'
    });
  }
});

// Show register form
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/register', { 
    title: 'Register',
    error: null 
  });
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.render('auth/register', {
        title: 'Register',
        error: 'Passwords do not match'
      });
    }
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('auth/register', {
        title: 'Register',
        error: 'Username or email already exists'
      });
    }
    
    const user = new User({
      username,
      email,
      password,
      isAdmin: false
    });
    
    await user.save();
    
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    req.session.isAdmin = user.isAdmin;
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('auth/register', {
      title: 'Register',
      error: 'An error occurred. Please try again.'
    });
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
