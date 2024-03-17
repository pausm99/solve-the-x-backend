import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from "express";
import sequelize from "./config/database";
import routes from "./routes/index";

const port = 3000;

const app: Express = express();

app.use(express.json());


sequelize.sync({alter: true}).then(() => {
    console.log('Models synchronized with the database');
}).catch((error: Error) => {
    console.error('Error synchronizing models to the database:', error);
});


app.use('/', routes);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});