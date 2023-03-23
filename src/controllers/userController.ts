import { Request, Response } from "express";
import { User, addUser, getUserById, updateUser, deleteUser } from "../models/user";
import { v4 as uuidv4 } from 'uuid';
import { connectToDb, disconnectFromDb } from "../database";


export async function createUser(req: Request, res: Response): Promise<void> {
    const user: User = {
        userId: uuidv4(),
        email: req.body.email,
        displayName: req.body.displayName,
        createdAt: new Date(),
    };

    try {
        await connectToDb();
        await addUser(user);
        res.status(201).json({ message: 'User created', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    try {
        await connectToDb();
        const user = await getUserById(userId);
        if (user){
            res.status(200).json({ message: 'User found', user: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error: error });
    } finally {
        await disconnectFromDb();
    }
}

export async function updateU(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const updateData = req.body;
    try {
        await connectToDb();
        await updateUser(userId, updateData);
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error });
    }finally{
        await disconnectFromDb();
    }
}

export async function deleteU(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    try {
        await connectToDb();
        await deleteUser(userId);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error });
    }finally{
        await disconnectFromDb();
    }
}