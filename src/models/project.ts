import { Collection } from "mongodb";
import {  db } from "../database";

export interface Project {
    projectId: string;
    userId: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt?: Date;
    completed: boolean;
}

const collection:Collection<Project> = db.collection('Projects');



export async function addProject(project: Project): Promise<void> {
    try {
        await collection.insertOne(project);
    } catch (error) {
        console.log("Error adding project", error);
        throw error;
    }
}

export async function getProjectsByUserId(userId: string): Promise<Project[]> {
    try {
        const projects = await collection.find({ userId: userId }).toArray();
        return projects;
    } catch (error) {
        console.log("Error getting projects", error);
        throw error;
    }
}

export async function getProjectById(projectId: string): Promise<Project | null> {
    try {
        const project = await collection.findOne({ projectId: projectId });
        return project;
    } catch (error) {
        console.log("Error getting project", error);
        throw error;
    }
}

export async function updateProject(projectId: string, updateData: Partial<Project>): Promise<void> {
    try {
        await collection.updateOne({ projectId: projectId }, { $set: updateData });
    } catch (error) {
        console.log("Error updating project", error);
        throw error;
    }
}

export async function deleteProject(projectId: string): Promise<void> {
    try {
        await collection.deleteOne({ projectId: projectId });
    } catch (error) {
        console.log("Error deleting project", error);
        throw error;
    }
}
