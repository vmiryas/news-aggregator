import mongoose from 'mongoose';
import { IArticle } from './article.interface';

const articleSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String,
});

const ArticleModel = mongoose.model<IArticle & mongoose.Document>('Articles', articleSchema);
export default ArticleModel;
