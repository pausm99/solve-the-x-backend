import express, { Express } from "express";

const port = 3000;

const app: Express = express();

app.use('/');

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});