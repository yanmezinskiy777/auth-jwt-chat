const ApiError = require("../exeptions/error");
const tokenService = require("../services/token-service")

const AuthMiddleware = async (req, res, next) => {
    try{
        const authorization = req.headers.authorization;
        if(!authorization){
           return next(ApiError.UnauthorizedError("You are not authorized"));
        }
        const token = authorization.split(" ")[1];

        if(!token){
            return next(ApiError.UnauthorizedError("You are not authorized"));
        }

        const user = await tokenService.verifyToken(token, process.env.JWT_ACCESS_KEY);
        if(!user){
            return next(ApiError.UnauthorizedError("You are not authorized"));
        }
        req.user = user;
        next()
    } catch (error){
        next(ApiError.UnauthorizedError("You are not authorized"))
    }

}

module.exports = AuthMiddleware;