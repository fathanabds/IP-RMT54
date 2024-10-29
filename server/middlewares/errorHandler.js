function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      return res.status(400).json({ message: err.errors[0].message });
    case 'NotFound':
      return res.status(404).json({ message: err.message });
    case 'BadRequest':
      return res.status(400).json({ message: err.message });
    case 'Unauthorized':
      return res.status(401).json({ message: 'Invalid email/password' });
    case 'JsonWebTokenError':
      return res.status(401).json({ message: 'Invalid token' });
    case 'Forbidden':
      return res.status(403).json({ message: err.message });
    default:
      return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = errorHandler;
