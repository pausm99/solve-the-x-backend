import express, { Express } from "express";
import routes from "./routes/index";

const port = 3000;

const app: Express = express();

app.use('/', routes);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});