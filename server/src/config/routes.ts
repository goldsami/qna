import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', [], QuestionsCtrl.list);
router.put('/questions', [], QuestionsCtrl.add);
router.post('/questions/:id', [], QuestionsCtrl.update);
router.delete('/questions/:id', [], QuestionsCtrl.delete);

router.post('/questions/lock/:id', [], QuestionsCtrl.lock);
router.post('/questions/unlock/:id', [], QuestionsCtrl.unlock);

export default router;
