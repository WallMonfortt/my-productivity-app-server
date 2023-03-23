import { Router } from 'express';
import userRouter from './userRoutes';
import projectRouter from './projectRoutes';

// Init router and path
export const router = Router();

// Routes
//main route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add sub-routes userRoutes
router.use('/users', userRouter);

// Add sub-routes projectRoutes
router.use('/projects', projectRouter);


// Export the base-router
export default router;