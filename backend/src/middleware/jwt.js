import { verifyToken } from "../utils/token";

var chkAuth = function (req, res, next) {
    const token = extractToken(req);
    const userData=verifyToken(token);
    if(userData){
        req.user = userData;
        next();
    }else{
        res.status(401).send({ error: "Invalid token" });
    }
}

var extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

export default {
    chkAuth
};