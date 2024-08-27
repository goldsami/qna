import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';

const QuestionsCtrl = {

  list: (req: Request, res: Response) => {
    QuestionsService.getQuestions()
      .then(questions => {
        res.status(200).send(questions);
      }).catch(e => {
        console.error('failed to fetch questions', e);
        res.status(500).send();
    });
  },

  add: (req: Request, res: Response) => {
    if (!req.body) res.status(404).send();

    // TODO: add body validation
    QuestionsService.addQuestion(req.body)
      .then(question => {
        res.status(200).send(question);
      }).catch(e => {
        console.error('failed to add question', e);
        res.status(500).send();
    });
  },

  lock: (req: Request, res: Response) => {
    if (!req.params?.id) res.status(404).send();
    const id = req.params.id as string;

    QuestionsService.lockQuestion(id, req.sessionID)
      .then((locked) => res.status(200).send(locked))
      .catch(e => {
        res.status(200).send(false);
    });
  },

  unlock: (req: Request, res: Response) => {
    if (!req.params?.id) res.status(404).send();
    const id = req.params.id as string;

    QuestionsService.unlockQuestion(id, req.sessionID)
      .then((unlocked) => res.status(200).send(!!unlocked))
      .catch(e => {
        res.status(200).send(false);
    });
  },

  update: (req: Request, res: Response) => {
    if (!req.params?.id || !req.body) res.status(404).send();
    const id = req.params.id as string;

    // TODO: add validation
    QuestionsService.updateQuestion(id, req.sessionID, req.body)
      .then(() => res.status(200).send())
      .catch(e => {
        console.error('failed to update question', e);
        res.status(500).send();
    });
  },

  delete: (req: Request, res: Response) => {
    const id = req.params?.id as string;
    if (!id) res.status(404).send();

    QuestionsService.deleteQuestion(id)
      .then(() => res.status(200).send())
      .catch(e => {
        console.error('failed to delete questions', e);
        res.status(500).send();
    });
  },

};



export default QuestionsCtrl;
