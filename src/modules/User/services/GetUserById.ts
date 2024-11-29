import User from '../entity/Entities';
import AppDataSource from '../../../db/data-source';
import AppError from '../../../shared/errors/AppError';

class ShowUserService {
  findUserNameById = async (id: string) => {
    const carsRepository = AppDataSource.getRepository(User);

    const user = await carsRepository.findOneBy({ id });

    if (!user) {
      throw new AppError('User not found', 404);
    }


    return user.name;
  };
}
export default ShowUserService;