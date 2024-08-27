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
  static async lockQuestion(id: string, sessionID: string): Promise<number> {
    return Question.query()
      .findById(id)
      .andWhere(builder => {
        return builder.where({
          updatingBySession: null
        }).orWhere({
          updatingBySession: sessionID,
        })
      })
      .patch({
        updatingBySession: sessionID
      });
  }

  static async unlockQuestion(id: string, sessionID: string): Promise<number> {
    return Question.query().findById(id)
      .andWhere('updatingBySession', sessionID)
      .patch({
        updatingBySession: null,
      });
  }

  static async updateQuestion(id: string, question: Pick<Question, 'question' | 'answer'>): Promise<void> {
    const q = await Question.query().findById(id)
    const q1 = await Question.query().findById(+id)
    const q2 = await Question.query().where('id', id)
    const q3 = await Question.query().where('id', +id)
    const q4 = await Question.query().findOne('id', id)
    const q5 = await Question.query().findOne('id', +id)
    await Question.query().findById(id).patch({
      ...question,
    });
  }

  static async deleteQuestion(id: string): Promise<void> {
    await Question.query().deleteById(id);
  }
}
