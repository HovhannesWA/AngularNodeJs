const jwt = require("jsonwebtoken");
const token = require("./../models/token");

class TokenService {
  generateToken(payload) {
    const access_token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, {
      expiresIn: "5s",
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {
      expiresIn: "10d",
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(user_id, refresh_token) {
    const new_token = await token.findOne({ where: { user: user_id } });
    if (new_token) {
      new_token.refresh_token = refresh_token;
      return new_token.save();
    } else {
      const new_token = await token.create({ user: user_id, refresh_token });
      return new_token;
    }
  }

  async removeRefreshToken(refresh_token) {
    const token_data = token.destroy({ where: { refresh_token } });
    return token_data;
  }

  async verifyAccesToken(access_token) {
    try {      
      const data = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_KEY);
      return data;
    } catch (err) {
      console.log(err);  
      return null;
    }
  }

  async verifyRefreshToken(refresh_token) {
    try {
      const data = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_KEY);
      return data;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
