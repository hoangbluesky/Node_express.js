import express, { Application } from 'express';
import homeRouter from './homeRouter';
import adminRouter from './adminRouter';
import paymentRoutes from './paymentRouter';

import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

export default function route(app: Application): void {
  app.use('/admin', adminRouter);
  app.use('/payment', paymentRoutes);
  app.use('/', homeRouter);
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "src/public/images/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    console.log(path.extname("trong storage: " + file.originalname));
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({ storage, fileFilter });

export { upload };
