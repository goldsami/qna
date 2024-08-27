import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', [], QuestionsCtrl.list);
router.put('/questions', [], QuestionsCtrl.add);
router.post('/questions/:id', [], QuestionsCtrl.update);
router.delete('/questions/:id', [], QuestionsCtrl.delete);

export default router;
