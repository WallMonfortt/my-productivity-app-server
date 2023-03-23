import { Router } from 'express';
import {
    createProject,
    getProject,
    getProjects,
    updateProj,
    deleteProj,
  } from "../controllers/projectController";


const projectRouter = Router();

// projects routes
// Create new project
projectRouter.post('/', createProject);
// get projects by user id
projectRouter.get('/:userId', getProjects);
// get project by id
projectRouter.get('/:projectId', getProject);
// update project by id
projectRouter.put('/:projectId', updateProj);
// delete project by id
projectRouter.delete('/:projectId', deleteProj);

// Export the base-router
export default projectRouter;