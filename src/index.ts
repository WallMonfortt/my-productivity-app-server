import express from 'express';
import { connectToDb } from './database';
import router from './routes/router';

const uri = `mongodb+srv://walle:z6KKAN9wfMxJJ0K2@cluster0.cfc0d.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/', router);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


connectToDb();