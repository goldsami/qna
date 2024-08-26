"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questionsService_1 = require("../services/questionsService");
const QuestionsCtrl = {
    list: (req, res) => {
        questionsService_1.QuestionsService.getQuestions()
            .then(questions => {
            res.status(200).send(questions);
        }).catch(e => {
            console.error('failed to fetch questions', e);
            res.status(500).send();
        });
    },
};
exports.default = QuestionsCtrl;
//# sourceMappingURL=questionsCtrl.js.map