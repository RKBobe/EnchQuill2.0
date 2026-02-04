const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next(); // You are an Admin, proceed!
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };
  
  module.exports = { admin };