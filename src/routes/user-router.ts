import { UserRouter } from '../framework/router';
import { User } from '../models/user.model';
import { routerPrefix } from '../constants/router.constant';
import { createUser } from '../controllers/create-user';
import { getUsers } from '../controllers/get-users';
import { deleteUser } from '../controllers/delete-user';
import { updateUser } from '../controllers/update-user';

const users: User[] = [];
const userRouter = new UserRouter();

userRouter.get(routerPrefix, getUsers(users));

userRouter.post(routerPrefix, createUser(users));

userRouter.put(routerPrefix, updateUser(users));

userRouter.delete(routerPrefix, deleteUser(users));

export default userRouter;
