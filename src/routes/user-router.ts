import { UserRouter } from '../framework/router';
import { User } from '../models/user.model';
import { routerPrefix } from '../constants/router.constant';
import { createUser } from '../controllers/create-user';
import { getUsers } from '../controllers/get-users';

const users: User[] = [];
const userRouter = new UserRouter();

userRouter.get(routerPrefix, getUsers(users));

userRouter.post(routerPrefix, createUser(users));

userRouter.put(routerPrefix, () => console.log('put'));

userRouter.delete(routerPrefix, () => console.log('delete'));

export default userRouter;
