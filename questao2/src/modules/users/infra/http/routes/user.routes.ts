import { Router } from 'express';
import userController from './../controllers/UserController';

const usersRouter = Router();

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getUserById);

export default usersRouter;
