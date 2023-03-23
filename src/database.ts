import { MongoClient } from "mongodb";
import { config } from "./config";

const uri = `mongodb+srv://walle:z6KKAN9wfMxJJ0K2@cluster0.cfc0d.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);
export const db = client.db(config.database.dbName);


export async function connectToDb(): Promise<void> {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error);
        process.exit(1);
    }
}

export async function disconnectFromDb(): Promise<void> {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.log('Error disconnecting from database', error);
        process.exit(1);
    }
}

