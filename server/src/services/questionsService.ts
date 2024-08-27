import Question from "../models/Question";

const DEFAULT_QUESTIONS = [{
  questions: 'What?',
  answer: ''
},{
  questions: 'Who?',
  answer: ''
},{
  questions: 'Where',
  answer: ''
}];

export class QuestionsService {

  static async getQuestions(): Promise<Question[]> {
    return Question.query();
  }

  static async addQuestion(question: Pick<Question, 'question' | 'answer'>): Promise<Question> {
    return Question.query().insert({
      ...question,
    });
  }

  static async updateQuestion(id: string, question: Pick<Question, 'question' | 'answer'>): Promise<void> {
    await Question.query().findById(id).patch({
      ...question,
    });
  }

  static async deleteQuestion(id: string): Promise<void> {
    await Question.query().deleteById(id);
  }
}
