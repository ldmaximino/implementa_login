import { __dirname } from "../utils.js";

export const validateLogin = (req, res, next) => {
    //console.log('validateLogin: ', req.session);
    if(req.session.user && req.session.user.loggedIn) next();
        else return res.render(__dirname + '/views/user_not_auth');
};
