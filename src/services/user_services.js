import UserDao from "../daos/mongodb/user_dao.js";
import { UserModel } from '../daos/mongodb/models/user_model.js';
const userDao = new UserDao(UserModel);

export const register = async (user) => {
  try {
    return await userDao.register(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async(email,password) => {
  try {
    //console.log('services ida: ', email,password);
    const userExist = await userDao.login(email,password);
    //console.log('services vuelta: ', userExist);
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
