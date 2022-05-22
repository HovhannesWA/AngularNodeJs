const jwt = require('jsonwebtoken');
const token = require('./../models/token');

class TokenService{
    generateToken(payload){
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, {expiresIn: '30m'});
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {expiresIn: '10d'});
        return{
            access_token,
            refresh_token
        }
    }

    async saveToken(user_id, refresh_token){        
        const new_token = await token.findOne({where: {user: user_id}});        
        if(new_token){
            new_token.refresh_token = refresh_token;
            return new_token.save();
        }
        else{            
            const new_token = await token.create({user: user_id, refresh_token});
            return new_token;
        }        
    }
}


module.exports = new TokenService();