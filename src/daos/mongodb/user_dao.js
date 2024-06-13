export default class UserDao {
    constructor(model) {
        this.model = model;
    }

    async register(user) {
        try {
            const { email } = user;
            const userExist = await this.model.findOne({email});
            if(userExist) return null;
            return this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email,password) {
        try {
            return await this.model.findOne({email,password});
        } catch (error) {
            throw new Error(error);
        }
    }
}