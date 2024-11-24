import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log("header Authorization : ", req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  
  if(!token){
    return res.status(401).json({message: 'Unauthorized : no token provided'});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  }catch(err){
    res.status(401).json({message: 'Forbidden : Invalid token'});
  }
}

export default authMiddleware;