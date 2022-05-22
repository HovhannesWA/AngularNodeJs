const bcrypt = require("bcrypt");
const uuid = require('uuid');
const tokenService = require("./../services/tokenService");
const helperService = require("./../services/helperService");
const User = require("./../models/user");

class RegistrationService {
    async registerUser(user_data){
        const { first_name, last_name, email, password } = user_data;
        let hash_password = bcrypt.hashSync(password, +process.env.USER_PASSWORD_HASH_SALT);
        const email_confirm_token = uuid.v4();        
        let new_user = await User.create({
          first_name,
          last_name,
          email,
          email_is_confirmed: false,
          email_confirm_token,
          role: 7,
          password: hash_password,
        });
        return new_user;
    }









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

module.exports = new RegistrationService();
