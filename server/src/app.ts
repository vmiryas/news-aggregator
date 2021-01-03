import express from 'express';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { ArticlesController } from './api/controllers/articles.controller';

class App {
  public app: express.Application;
  public port: number;

  constructor() {
    dotenv.config({ path: join(__dirname, `./config/.env.${process.env.NODE_ENV}`) });
    this.app = express();
    this.port = Number(process.env.PORT);

    this.initializeMiddlewares();
    this.initializeControllers();
    this.connectToTheDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private initializeControllers() {
    this.app.use('/', new ArticlesController().router);
  }

  private connectToTheDatabase() {
    const { MONGO_URI } = process.env;
    mongoose.connect(MONGO_URI);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
