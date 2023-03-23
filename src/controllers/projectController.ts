// controllers/projectController.ts

import { Request, Response } from "express";
import { Project, addProject, getProjectsByUserId, getProjectById, updateProject, deleteProject } from "../models/project";
import { v4 as uuidv4 } from "uuid";
import { connectToDb, disconnectFromDb } from "../database";

export async function createProject(req: Request, res: Response): Promise<void> {
    const project: Project = {
        projectId: uuidv4(),
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        completed: false,
    };

    try {
        await connectToDb();
        await addProject(project);
        res.status(201).json({ message: "Project created", project: project });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function getProjects(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
        await connectToDb();
        const projects = await getProjectsByUserId(userId);
        res.status(200).json({ message: "Projects found", projects: projects });
    } catch (error) {
        res.status(500).json({ message: "Error getting projects", error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function getProject(req: Request, res: Response): Promise<void> {
    const projectId = req.params.projectId;

    try {
        await connectToDb();
        const project = await getProjectById(projectId);
        if (project) {
            res.status(200).json({ message: "Project found", project: project });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting project", error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function updateProj(req: Request, res: Response): Promise<void> {
    const projectId = req.params.projectId;
    const updateData = req.body;

    try {
        await connectToDb();
        await updateProject(projectId, updateData);
        res.status(200).json({ message: "Project updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function deleteProj(req: Request, res: Response): Promise<void> {
    const projectId = req.params.projectId;

    try {
        await connectToDb();
        await deleteProject(projectId);
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: error });
    } finally {
        await disconnectFromDb();
    }
}
