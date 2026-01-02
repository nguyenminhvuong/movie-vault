export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/dashboard/login');
};  

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
};