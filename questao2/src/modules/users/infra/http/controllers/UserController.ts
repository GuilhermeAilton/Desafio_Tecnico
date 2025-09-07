import { Request, Response } from 'express';
import { GetAllUsersService } from '../../../services/GetAllUserService';
import { GetUserByIdService } from '../../../services/GetUserService';



class UserController {
  async getAllUsers(req: Request, res: Response) {
    const getAll = new GetAllUsersService();
    const users = await getAll.execute(req.query);
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const getUser = new GetUserByIdService();
    const user = await getUser.execute(id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.status(200).json(user);
  }
}

export default new UserController();
