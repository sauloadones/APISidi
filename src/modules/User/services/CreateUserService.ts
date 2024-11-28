import User from "../entity/Entities";
import AppDataSource from "../../../db/data-source";
import IUserService from "../../interfaces/IUserService";
import AppError from "../../../shared/errors/AppError";
import { encrypt } from "../encryptPassword/PasswordEncryption";

class CreateUserService {
    createUser = async (userData: IUserService): Promise<User> => {
        const userRepository = AppDataSource.getRepository(User) 

        const { email, name, password, comfirmPassword} = userData

        console.log(password)
        console.log(comfirmPassword)



        const hashed = await encrypt(password)
        
        const newUser = new User();
        newUser.email = email
        newUser.name = name
        newUser.password = hashed

        const existingUser = await userRepository.findOne({
            where: {email: email}
        })

        if(existingUser) {
            throw new AppError('Esse email ja existe', 409)
        }


        await userRepository.save(newUser)
        
        return newUser
    }
}

export default CreateUserService