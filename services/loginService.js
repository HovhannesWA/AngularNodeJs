const bcrypt = require("bcrypt");
const tokenService = require("./../services/tokenService");
const helperService = require("./../services/helperService");
const User = require("./../models/user");

class LoginService {
  async checkData(email, password) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        let password_is_true = await bcrypt.compare(password, user.password);
        if (password_is_true) {
          const { access_token, refresh_token } = tokenService.generateToken(
            helperService.userDPO(user)
          );
          await tokenService.saveToken(user.id, refresh_token);
          resolve({ user, access_token, refresh_token });
        } else {
          let error = [{ param: "email", msg: "Email or password is invalid" }];
          reject(error);
        }
      } else {
        let error = [{ param: "email", msg: "Email or password is invalid" }];
        reject(error);
      }
    });
  }
}

module.exports = new LoginService();
