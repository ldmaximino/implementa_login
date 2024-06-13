import UserDao from "../daos/mongodb/user_dao.js";
import { UserModel } from "../daos/mongodb/models/user_model.js";
const userDao = new UserDao(UserModel);

export const register = async (user) => {
  try {
    return await userDao.register(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (email, password) => {
  try {
    const userExist = await userDao.login(email, password);
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
