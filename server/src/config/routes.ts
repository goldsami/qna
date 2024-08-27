import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', [], QuestionsCtrl.list);
router.put('/add', [], QuestionsCtrl.add);
router.post('/update/:id', [], QuestionsCtrl.update);
router.delete('/delete/:id', [], QuestionsCtrl.delete);

export default router;
