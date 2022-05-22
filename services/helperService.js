class HelperService{
    userDPO(user_data){
        let {first_name, last_name, email} = user_data;
        return{
            first_name,
            last_name,
            email
        }
    }
}

module.exports = new HelperService();