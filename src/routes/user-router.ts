import { UserRouter } from '../framework/router';
import { User } from '../models/user.model';
import { routerPrefix } from '../constants/router.constant';
import { createUser } from '../controllers/create-user';

const users: User[] = [];
const userRouter = new UserRouter();

userRouter.get(routerPrefix, () => console.log('get'));

userRouter.post(routerPrefix, createUser(users));

userRouter.put(routerPrefix, () => console.log('put'));

userRouter.delete(routerPrefix, () => console.log('delete'));

export default userRouter;
