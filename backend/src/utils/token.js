import jwt from 'jsonwebtoken';
const tokenKey='MyToken';

export const createToken=(data)=>{
  return jwt.sign(data, tokenKey,{ expiresIn: '1h' });
}

export const verifyToken=(token)=>{
  try {
    return jwt.verify(token, tokenKey);
  } catch(err) {
    return false;
  }
}
