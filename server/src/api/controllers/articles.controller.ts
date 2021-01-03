import ArticleModel from 'dal/models/article/artice';
import express from 'express';
import { IArticle } from '../../dal/models/article/article.interface';

export class ArticlesController {
  public path = '/articles';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, this.getAllArticles);
    this.router.get(`${this.path}/:id`, this.getArticleById);
    this.router.patch(`${this.path}/:id`, this.updateArticle);
    this.router.delete(`${this.path}/:id`, this.deleteArticle);
    this.router.post(this.path, this.createArticle);
  }

  public async getAllArticles(request: express.Request, response: express.Response): Promise<void> {
    const result = await ArticleModel.find();
    response.send(result);
  }

  public async getArticleById(request: express.Request, response: express.Response): Promise<void> {
    const { id } = request.params;
    const result = await ArticleModel.findById(id);
    response.send(result);
  }

  public async createArticle(request: express.Request, response: express.Response): Promise<void> {
    const article: IArticle = request.body;
    const createdArticle = new ArticleModel(article);
    const result = await createdArticle.save();
    response.send(result);
  }

  public async updateArticle(request: express.Request, response: express.Response): Promise<void> {
    const { id } = request.params;
    const articleData: IArticle = request.body;
    const result = await ArticleModel.findByIdAndUpdate(id, articleData, { new: true });
    response.send(result);
  }

  public async deleteArticle(request: express.Request, response: express.Response): Promise<void> {
    const { id } = request.params;
    const result = await ArticleModel.findByIdAndDelete(id);
    response.send(result);
  }
}
