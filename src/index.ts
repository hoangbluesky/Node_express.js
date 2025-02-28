import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import session = require("express-session");
import path = require("path");
import adminRouter from "@routers/adminRouter";
import { AppDataSource } from "@databases/data-source";
import router from "@routers/index";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;



// cấu hình bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cau hinh cookie parser
app.use(cookieParser());

// cấu hình session
app.use(session({
  secret: 'mykey', // ma hoa ID session
  resave: false, // khong luu lai session neu khong thay doi
  saveUninitialized: true, // luu lai session khi chua duoc khoi tao
}))

// luu session vao locals global
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})
// cấu hình static file
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false, // Tắt ETag
  lastModified: false, // Tắt Last-Modified
  cacheControl: false // Tắt Cache-Control
}));

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
app.use('/admin', adminRouter);

router(app);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});