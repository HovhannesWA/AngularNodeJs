const token_service = require("./../services/tokenService");

const AuthMiddleware = async (req, res, next) => {
    try{
        const auth_header = req.headers.authorization;
        if(!auth_header){
            throw new Error({message: 'unauthorizated'});
        }
        const access_token = auth_header.split(' ')[1]; //[0] is string bearer
        if(!access_token){
            throw new Error({message: 'unauthorizated'});
        }
        const token_is_valid = await token_service.verifyAccesToken(access_token);
        if(!token_is_valid){
            throw new Error({message: 'unauthorizated'});
        }
        else{
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(411).send({error: 'unauthorizated'})
    }
}

module.exports = AuthMiddleware;