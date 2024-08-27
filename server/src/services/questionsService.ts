import Question from "../models/Question";

class QuestionDTO {
  constructor(question: Question) {
    this.id = question.id;
    this.question = question.question;
    this.answer = question.answer;
  }
  id: string;
  question: string;
  answer: string;
}

export class QuestionsService {

  static async getQuestions(): Promise<QuestionDTO[]> {
    const result = await Question.query();
    return result.map(x => new QuestionDTO(x));
  }

  static async addQuestion(question: Pick<Question, 'question' | 'answer'>): Promise<QuestionDTO> {
    const result = await Question.query().insert({
      ...question,
    });
    return new QuestionDTO(result);
  }

  // TODO: add some job (node-schedule) to remove lock after some period of time when client is not active
  static async lockQuestion(id: string, sessionID: string): Promise<any> {
    await Question.query()
      .findById(id)
      .andWhere(builder => {
        return builder.where({
          updatingBySession: null
        })
      })
      .patch({
        updatingBySession: sessionID
      });

    const question = await Question.query().findById(id);
    return question.updatingBySession === sessionID;
  }

  static async unlockQuestion(id: string, sessionID: string): Promise<boolean> {
    await Question.query().findById(id)
      .andWhere('updatingBySession', sessionID)
      .patch({
        updatingBySession: null,
      });
    
    const question = await Question.query().findById(id);
    return question.updatingBySession === null;
  }

  static async updateQuestion(id: string, sessionID: string, question: Pick<Question, 'question' | 'answer'>): Promise<void> {
    await Question.query().findById(id)
      .andWhere('updatingBySession', sessionID)
      .patch({
        ...question,
      });
  }

  static async deleteQuestion(id: string): Promise<void> {
    await Question.query().deleteById(id);
  }
}
