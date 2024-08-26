"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const DEFAULT_QUESTIONS = [{
        questions: 'What?',
        answer: ''
    }, {
        questions: 'Who?',
        answer: ''
    }, {
        questions: 'Where',
        answer: ''
    }];
// TODO: use any storage to save the questions
class QuestionsService {
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(DEFAULT_QUESTIONS);
        });
    }
}
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questionsService.js.map