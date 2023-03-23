
import { createUser, deleteU, getUser, updateU } from '../controllers/userController';
import { Router } from 'express';

const userRouter = Router();

//User routes
// Create new user
userRouter.post('/create', createUser);
// get user by id
userRouter.get('/:userId', getUser);
// update user by id
userRouter.put('/:userId', updateU);
// delete user by id
userRouter.delete('/:userId', deleteU);


// Export the base-router
export default userRouter;