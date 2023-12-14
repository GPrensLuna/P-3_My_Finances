export default (err, req, res, next) => {
  const status = err.status || 500; 
  const message = err.message || "Error internal server"; 
  console.error(err); 
  res.status(status).send(message); 
};