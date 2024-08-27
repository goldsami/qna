import { Model } from 'objection'

export default class Question extends Model {
  id!: string;
  question!: string;
  answer!: string;

  static tableName = 'questions';
}