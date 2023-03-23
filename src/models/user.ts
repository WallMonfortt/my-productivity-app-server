import { Collection } from "mongodb";
import { client, db } from "../database";
import { config } from '../config';

export interface User {
    userId: string;
    email: string;
    displayName: string;
    createdAt: Date;
}


const collection:Collection<User> = db.collection('Users');

export async function addUser( user:User): Promise<void> {
    try {
        await collection.insertOne(user);
    } catch (error) {
        console.log('Error adding user', error);
        process.exit(1);
    }
};

export async function getUserById(userId: string): Promise<User | null> {
    try {
        const user = await collection.findOne({ userId: userId });
        return user;
    } catch (error) {
        console.log('Error getting user', error);
        throw error;
    }
};

export async function updateUser(userId: string, updateData: Partial<User>): Promise<void> {
    try {
        await collection.updateOne({userId: userId}, {$set: updateData});
    } catch (error) {
        console.log('Error updating user', error);
        throw error;
        
    }
}

export async function deleteUser(userId: string): Promise<void> {
    try {
        await collection.deleteOne({userId: userId});
    } catch (error) {
        console.log('Error deleting user', error);
        throw error;
    }
}