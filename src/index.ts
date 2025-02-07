import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser = require("body-parser");
import path = require("path");
import homeRouter from "@routers/homeRouter";
import adminRouter from "@routers/adminRouter";
import { AppDataSource } from "@databases/data-source";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;



// cấu hình bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cấu hình static file
app.use(express.static(path.join(__dirname, "public")));

// cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');
// connect database
AppDataSource.initialize()
.then(() => {
    console.log("Connect Ok!")
})
.catch((err) => {
    console.error("Error Connect", err)
})

// routes
app.use('/',homeRouter);
app.use('/home',homeRouter);
app.use('/admin',adminRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});