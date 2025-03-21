export default function authMiddleware(req, res, next) {
  // Here you can add the authentication logic if needed
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
