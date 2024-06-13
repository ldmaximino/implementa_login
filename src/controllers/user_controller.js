import * as service from "../services/user_services.js";

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newUser = await service.register(req.body);
        if(!newUser) return res.redirect('/user_exist');
        return res.redirect('/user_registered');
    } catch (error) {
      next(error);
    }
};

export const login = async (req,res,next) => {
    try {
        let userExist;
        const { email, password} = req.body;
        //console.log(email.toLowerCase());
        //console.log(password);
        if(email.toLowerCase() === 'admincoder@coder.com' && password === 'adminCod3r123') {
            userExist = {
                ...req.body,
                first_name: 'Coderhouse',
                last_name: '',
                role: 'admin',
            };
            req.session.user = {
                loggedIn: true,
                first_name: userExist.first_name,
                last_name: userExist.last_name,
                role: userExist.role,
            }
        } else {
            userExist = await service.login(email,password);
            //console.log('userexist: ',userExist);
            if(!userExist) return res.redirect('/user_login_error');
            req.session.user = {
                loggedIn: true,
                first_name: userExist.first_name,
                last_name: userExist.last_name,
                role: userExist.role,
            };
        }
        return res.redirect('/products');
    } catch (error) {
        next(error);
    }
};
