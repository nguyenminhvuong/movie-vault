// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.isAdmin) {
    return next();
  }
  res.status(403).render('public/error', {
    title: 'Access Denied',
    error: { message: 'You do not have permission to access this page.' }
  });
};

module.exports = { isAuthenticated, isAdmin };
